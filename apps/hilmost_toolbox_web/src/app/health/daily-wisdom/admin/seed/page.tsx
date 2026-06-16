"use client";

import React, { useState } from "react";
import { collection, writeBatch, doc, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/wisdom/firebase";

export default function AdminSeedPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // IMPLEMENTATION DISABLED AS REQUESTED
  const IS_DISABLED = true;

  const handleSeed = async () => {
    if (IS_DISABLED) {
      setMessage("Seeding is currently disabled.");
      return;
    }

    setLoading(true);
    setMessage("Fetching from zenquotes.io...");

    try {
      // 1. Fetch from ZenQuotes
      const response = await fetch("https://zenquotes.io/api/quotes");
      if (!response.ok) throw new Error("Failed to fetch from ZenQuotes API");
      const data = await response.json();

      // 2. Check DB limit
      const quotesCol = collection(db, "quotes");
      const countSnapshot = await getCountFromServer(quotesCol);
      const dbCount = countSnapshot.data().count;

      if (dbCount >= 1001) {
        throw new Error(`Database already has ${dbCount} quotes. Limit is 1001.`);
      }

      setMessage(`Fetched ${data.length} quotes. Writing to Firestore...`);

      // 3. Batch Write
      const batch = writeBatch(db);
      let added = 0;

      for (const item of data) {
        if (dbCount + added >= 1001) break;
        const newDocRef = doc(quotesCol);
        batch.set(newDocRef, {
          id: newDocRef.id,
          text: item.q,
          philosopher: item.a,
          date: new Date(),
        });
        added++;
      }

      await batch.commit();
      setMessage(`Successfully seeded ${added} new quotes!`);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setMessage(`Error: ${err.message}`);
      } else {
        setMessage(`Error: An unknown error occurred.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-16 px-4 max-w-2xl text-center">
      <h1 className="text-3xl font-bold mb-6">Database Seeding Tool</h1>
      <p className="mb-8 text-slate-600">
        This tool fetches quotes from ZenQuotes and populates the Firestore database up to the 1001 limit.
      </p>

      {IS_DISABLED && (
        <div className="bg-amber-100 text-amber-900 p-4 rounded-lg mb-8">
          <strong>Notice:</strong> The database seeding logic is implemented but currently disabled as per the deployment plan.
        </div>
      )}

      <button
        onClick={handleSeed}
        disabled={loading || IS_DISABLED}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg disabled:opacity-50"
      >
        {loading ? "Seeding..." : "Seed Database"}
      </button>

      {message && (
        <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-left font-mono text-sm">
          {message}
        </div>
      )}
    </div>
  );
}

