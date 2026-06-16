import { useState, useEffect } from "react";
import { Quote, fallbackQuotes } from "@/lib/wisdom/fallbackQuotes";
import { collection, query, where, limit, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/wisdom/firebase";

export function useDailyQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrowStart = new Date(todayStart);
        tomorrowStart.setDate(tomorrowStart.getDate() + 1);

        const q = query(
          collection(db, "quotes"),
          where("date", ">=", Timestamp.fromDate(todayStart)),
          where("date", "<", Timestamp.fromDate(tomorrowStart)),
          limit(1)
        );

        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const data = doc.data();
          setQuote({
            id: doc.id,
            text: data.text,
            philosopher: data.philosopher
          });
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Firestore fetch failed, using fallback:", e);
      }

      // Fallback
      const today = new Date();
      const dayOfYear = Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      
      const index = dayOfYear % fallbackQuotes.length;
      setQuote(fallbackQuotes[index]);
      setLoading(false);
    }

    fetchQuote();
  }, []);

  return { quote, loading };
}

