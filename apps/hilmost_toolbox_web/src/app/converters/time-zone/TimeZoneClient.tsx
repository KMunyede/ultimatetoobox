"use client";

import { useState, useEffect } from "react";
import { formatInTimeZone, toDate } from "date-fns-tz";
import { motion, AnimatePresence } from "framer-motion";
import { ShareButton } from "@/components/ShareButton";
import { ToolTutorial, DateTimePicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { Plus, X, ArrowRight, Clock } from "lucide-react";

const formatZoneName = (zone: string) => zone.replace(/[_-]/g, " ");

export function TimeZoneClient() {
  const [state, setState] = useUrlState({
    sourceZone: "UTC",
    sourceTime: "", // ISO string or empty
    targetZones: "America/New_York,Europe/London,Asia/Tokyo"
  });

  const { sourceZone, sourceTime, targetZones } = state as { sourceZone: string; sourceTime: string; targetZones: string };
  
  const [availableZones, setAvailableZones] = useState<string[]>([]);
  const [newZone, setNewZone] = useState("");
  const targets = targetZones ? targetZones.split(",") : [];

  useEffect(() => {
    // Populate available time zones natively supported by the browser
    try {
      const zones = Intl.supportedValuesOf("timeZone");
      setTimeout(() => setAvailableZones(zones), 0);
      
      // Auto-detect local zone if sourceZone is not set to a "real" intent
      if (sourceZone === "UTC" && !sourceTime) {
        const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (local) {
          setTimeout(() => setState({ sourceZone: local }), 0);
        }
      }

      } catch (e) {
        console.warn("Intl.supportedValuesOf not supported");
      }

    // Auto-populate sourceTime if empty
    if (!sourceTime && !window.location.search.includes("sourceTime")) {
      const d = new Date();
      const pad = (n: number) => n.toString().padStart(2, "0");
      const formatted = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      setState({ sourceTime: formatted });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddZone = () => {
    if (newZone && !targets.includes(newZone)) {
      const newTargets = [...targets, newZone].join(",");
      setState({ targetZones: newTargets });
      setNewZone("");
    }
  };

  const handleRemoveZone = (zoneToRemove: string) => {
    const newTargets = targets.filter(z => z !== zoneToRemove).join(",");
    setState({ targetZones: newTargets });
  };

  const parseSourceDate = () => {
    if (!sourceTime) return new Date();
    // Reconstruct date object from local input string in the selected sourceZone
    try {
      // Date-fns-tz toDate can parse an ISO string assuming the provided timeZone
      return toDate(sourceTime, { timeZone: sourceZone });
    } catch {
      return new Date();
    }
  };

  const sourceDateObj = parseSourceDate();

  const tourSteps = [
    { element: '#tour-tz-source', popover: { title: '1. Source Time', description: 'Select your starting time and time zone.' } },
    { element: '#tour-tz-targets', popover: { title: '2. Target Zones', description: 'See the converted time in multiple cities instantly.' } },
    { element: '#tour-tz-add', popover: { title: '3. Add Zones', description: 'Search and add any global time zone to your list.' } },
  ];

  return (
    <div className="space-y-4">

      <div className="grid md:grid-cols-12 gap-8">
        {/* Source Configuration */}
        <div id="tour-tz-source" className="md:col-span-5 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-2xl text-emerald-600 dark:text-emerald-400">
              <Clock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Source Time</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Time Zone
              </label>
              <select
                value={sourceZone}
                onChange={(e) => setState({ sourceZone: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              >
                {availableZones.map(z => (
                  <option key={z} value={z}>{formatZoneName(z)}</option>
                ))}
              </select>
            </div>
            
            <DateTimePicker
              label="Date & Time"
              value={sourceTime}
              onChange={(val) => setState({ sourceTime: val })}
            />
          </div>
        </div>

        <div className="hidden md:flex md:col-span-1 items-center justify-center">
          <ArrowRight className="w-10 h-10 text-slate-300 dark:text-slate-700" />
        </div>

        {/* Targets Configuration */}
        <div id="tour-tz-targets" className="md:col-span-6 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Converted Times</h2>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {targets.map(zone => {
                let formattedTime = "";
                let formattedDate = "";
                try {
                  formattedTime = formatInTimeZone(sourceDateObj, zone, "hh:mm a zzz");
                  formattedDate = formatInTimeZone(sourceDateObj, zone, "EEEE, MMM d, yyyy");
                } catch {
                  formattedTime = "Invalid Date";
                }

                return (
                  <motion.div
                    key={zone}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-sm"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200">{formatZoneName(zone)}</h3>
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{formattedTime}</p>
                      <p className="text-sm text-slate-500">{formattedDate}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveZone(zone)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition"
                      aria-label={`Remove ${zone}`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {targets.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                No target time zones selected. Add one below!
              </div>
            )}
          </div>

          <div id="tour-tz-add" className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Add Time Zone
            </label>
            <div className="flex gap-2">
              <select
                value={newZone}
                onChange={(e) => setNewZone(e.target.value)}
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select a region/city...</option>
                {availableZones.filter(z => !targets.includes(z)).map(z => (
                  <option key={z} value={z}>{formatZoneName(z)}</option>
                ))}
              </select>
              <button
                onClick={handleAddZone}
                disabled={!newZone}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white p-3 rounded-xl transition"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
