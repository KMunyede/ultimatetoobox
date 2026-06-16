"use client";

import React from "react";
import { useAuth } from "@/components/wisdom/AuthProvider";
import { User, Shield, Flame, Activity } from "lucide-react";

export default function ProfilePage() {
  const { user, profile, isPremium } = useAuth();
  
  // Note: For now, features are unlocked so we simulate a basic premium display.
  // In the future, this will sync with the real user streak and subscription status.

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
          Your <span className="text-emerald-600 dark:text-emerald-500">Journey</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Track your progress, manage your account, and see how far you&apos;ve come.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center shadow-sm">
          <Flame className="w-10 h-10 text-orange-500 mx-auto mb-4" />
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Current Streak</p>
          <p className="text-4xl font-bold text-slate-800 dark:text-slate-100">{profile?.currentStreak || 0}</p>
          <p className="text-xs text-slate-400 mt-2">days in a row</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center shadow-sm">
          <Activity className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Longest Streak</p>
          <p className="text-4xl font-bold text-slate-800 dark:text-slate-100">{profile?.longestStreak || 0}</p>
          <p className="text-xs text-slate-400 mt-2">personal best</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center shadow-sm flex flex-col items-center justify-center">
          <Shield className={`w-10 h-10 mx-auto mb-4 ${isPremium ? 'text-indigo-500' : 'text-slate-400'}`} />
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Status</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{isPremium ? "Premium" : "Free"}</p>
          <p className="text-xs text-emerald-500 font-medium mt-2">All features unlocked</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Account Profile</h2>
            <p className="text-slate-500">Manage your settings and preferences</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Email Address</p>
              <p className="text-sm text-slate-500">{user?.email || "Guest User"}</p>
            </div>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              Update
            </button>
          </div>
          
          <div className="flex justify-between items-center py-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Subscription</p>
              <p className="text-sm text-slate-500">Currently enrolled in Free Trial (All Access)</p>
            </div>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

