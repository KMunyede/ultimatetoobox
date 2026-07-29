"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { formatInTimeZone, toDate } from "date-fns-tz";
import { motion, AnimatePresence } from "framer-motion";
import { DateTimePicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { Plus, X, ArrowRight, Clock, Search, Users, ChevronDown, User, Copy, Check } from "lucide-react";
import { Tooltip } from "@utilitiessite/ui";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

const formatZoneName = (zone: string) => {
  const name = zone.replace(/[_-]/g, " ");
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      timeZoneName: 'shortOffset'
    });
    const parts = formatter.formatToParts(new Date());
    let offset = parts.find(p => p.type === 'timeZoneName')?.value || '';
    offset = offset.replace('GMT', 'UTC');
    return `${name} (${offset})`;
  } catch {
    return name;
  }
};

function isDST(timezone: string): boolean {
  try {
    const year = new Date().getFullYear();
    const jan = new Date(year, 0, 1);
    const jul = new Date(year, 6, 1);
    const janOffset = new Intl.DateTimeFormat('en', { timeZone: timezone, timeZoneName: 'short' }).format(jan);
    const julOffset = new Intl.DateTimeFormat('en', { timeZone: timezone, timeZoneName: 'short' }).format(jul);
    const nowOffset = new Intl.DateTimeFormat('en', { timeZone: timezone, timeZoneName: 'short' }).format(new Date());
    return janOffset !== julOffset && nowOffset === julOffset;
  } catch {
    return false;
  }
}

function getAvailability(timezone: string, now: Date) {
  const localHour = Number(formatInTimeZone(now, timezone, "H"));
  if (localHour >= 9 && localHour < 17) return { label: "Available", color: "bg-emerald-100 text-emerald-700 border-emerald-200" };
  if ((localHour >= 7 && localHour < 9) || (localHour >= 17 && localHour < 20)) return { label: "Early/Late", color: "bg-yellow-100 text-yellow-700 border-yellow-200" };
  return { label: "Offline", color: "bg-red-100 text-red-700 border-red-200" };
}

// Optimized Team Member Row
const TeamMemberRow = React.memo(({ member, now, onRemove }: { member: any, now: Date, onRemove: () => void }) => {
  const availability = getAvailability(member.timezone, now);
  const timeStr = formatInTimeZone(now, member.timezone, "HH:mm:ss");
  const dateStr = formatInTimeZone(now, member.timezone, "EEE, MMM d");
  const currentHour = Number(formatInTimeZone(now, member.timezone, "H"));

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-slate-800/50 border border-[#D8D6CF] dark:border-slate-800 p-4 rounded-2xl group transition-all hover:border-brand-primary/30">
      <div className="h-12 w-12 rounded-full bg-brand-primary flex items-center justify-center text-white font-normal text-lg shrink-0 shadow-sm">
        {member.name.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1 w-full text-center sm:text-left">
        <div className="flex flex-col">
          <span className="font-normal text-slate-800 dark:text-slate-100">{member.name}</span>
          <span className="text-[10px] text-slate-400 font-normal uppercase tracking-widest">{formatZoneName(member.timezone)}</span>
        </div>
      </div>

      <div className="flex-1 text-center">
        <p className="text-2xl font-normal text-slate-800 dark:text-white tabular-nums">{timeStr}</p>
        <p className="text-[10px] font-normal text-slate-400 uppercase tracking-widest">{dateStr}</p>
      </div>

      <div className="hidden lg:flex flex-1 overflow-x-auto no-scrollbar">
        <div className="flex gap-1 items-center px-2 py-1 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
          {Array.from({ length: 24 }).map((_, hour) => {
            const isCurrent = currentHour === hour;
            let color = "bg-slate-100 dark:bg-slate-800 text-slate-300";
            if (hour >= 9 && hour < 17) color = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
            else if ((hour >= 7 && hour < 9) || (hour >= 17 && hour < 20)) color = "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";

            return (
              <div
                key={hour}
                className={`w-6 h-8 flex flex-col items-center justify-center rounded transition-all shrink-0 ${color} ${isCurrent ? 'ring-2 ring-brand-primary scale-110 shadow-sm z-10 bg-white dark:bg-slate-800' : 'opacity-60'}`}
              >
                <span className="text-micro font-normal">{hour.toString().padStart(2, '0')}</span>
                {isCurrent && <div className="w-1 h-1 bg-brand-primary rounded-full mt-0.5" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {isDST(member.timezone) && (
          <span className="text-[10px] font-normal bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded uppercase tracking-wider">DST</span>
        )}
        <div className={`text-micro font-normal px-2.5 py-1 rounded-full border ${availability.color} uppercase tracking-widest`}>
          {availability.label}
        </div>
        <button onClick={onRemove} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
          <X size={18} />
        </button>
      </div>
    </div>
  );
});
TeamMemberRow.displayName = "TeamMemberRow";

// Optimized Target Zone Row
const TargetZoneRow = React.memo(({ zone, date, onRemove }: { zone: string, date: Date, onRemove: () => void }) => {
  let formattedTime = "";
  let formattedDate = "";
  try {
    formattedTime = formatInTimeZone(date, zone, "HH:mm:ss zzz").replace('GMT', 'UTC');
    formattedDate = formatInTimeZone(date, zone, "EEEE, MMM d, yyyy");
  } catch {
    formattedTime = "Invalid Date";
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center justify-between bg-white dark:bg-slate-800 border border-[#D8D6CF] dark:border-slate-700 rounded-2xl p-4 shadow-sm"
    >
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-normal text-slate-800 dark:text-slate-200 text-sm">{formatZoneName(zone)}</h3>
          {isDST(zone) && (
            <span className="text-[10px] font-normal bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded uppercase tracking-wider">DST</span>
          )}
        </div>
        <p className="text-2xl font-normal text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">{formattedTime}</p>
        <p className="text-[10px] font-normal text-slate-400 uppercase tracking-widest">{formattedDate}</p>
      </div>
      <Tooltip content={`Remove ${formatZoneName(zone)}`} position="left">
        <button
          onClick={onRemove}
          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition"
        >
          <X className="w-5 h-5" />
        </button>
      </Tooltip>
    </motion.div>
  );
});
TargetZoneRow.displayName = "TargetZoneRow";

interface SearchableSelectProps {
  value: string;
  options: string[];
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
}

function SearchableSelect({ value, options, onChange, placeholder, className, label }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return options
      .filter(o => o.toLowerCase().includes(s))
      .sort((a, b) => a.localeCompare(b));
  }, [options, search]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className="relative group">
        <Input
          label={label}
          type="text"
          value={isOpen ? search : formatZoneName(value)}
          placeholder={placeholder}
          onFocus={() => { setIsOpen(true); setSearch(""); }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search size={14} className="absolute right-3 bottom-3.5 text-slate-400 group-focus-within:text-brand-primary pointer-events-none" />
      </div>
      {isOpen && (
        <div className="absolute z-[70] mt-1 w-full max-h-60 overflow-y-auto bg-white dark:bg-slate-900 border border-[#D8D6CF] dark:border-slate-800 rounded-lg shadow-2xl custom-scrollbar animate-in fade-in zoom-in-95 duration-200">
          {filtered.length > 0 ? filtered.map(opt => (
            <button key={opt} onClick={() => { onChange(opt); setIsOpen(false); setSearch(""); }}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-brand-primary/10 hover:text-brand-primary transition-colors ${opt === value ? 'bg-brand-primary/5 text-brand-primary font-normal' : 'text-slate-600 dark:text-slate-300'}`}
            >
              {formatZoneName(opt)}
            </button>
          )) : <div className="p-4 text-xs text-slate-400 text-center">No matching time zones</div>}
        </div>
      )}
    </div>
  );
}

export function TimeZoneClient() {
  const [state, setState] = useUrlState({
    sourceZone: "UTC",
    sourceTime: "",
    targetZones: "America/New_York,Europe/London,Asia/Tokyo"
  });

  const { sourceZone, sourceTime, targetZones } = state as { sourceZone: string; sourceTime: string; targetZones: string };
  
  const [availableZones, setAvailableZones] = useState<string[]>([]);
  const [newZone, setNewZone] = useState("");
  const [now, setNow] = useState(new Date());

  const [teamMembers, setTeamMembers] = useState<{ name: string; timezone: string }[]>([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberTZ, setNewMemberTZ] = useState("");
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState(false);

  const targets = useMemo(() => targetZones ? targetZones.split(",") : [], [targetZones]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("hilmost_team_clocks");
    if (saved) { try { setTeamMembers(JSON.parse(saved)); } catch (e) { console.error(e); } }

    const params = new URLSearchParams(window.location.search);
    const teamParam = params.get("team");
    if (teamParam) {
      const parts = teamParam.split(",");
      const loadedTeam = parts.map(p => {
        const [name, timezone] = p.split(":");
        return { name: decodeURIComponent(name), timezone: decodeURIComponent(timezone) };
      }).filter(p => p.name && p.timezone);
      if (loadedTeam.length > 0) { setTeamMembers(loadedTeam); setIsTeamOpen(true); }
    }

    try { setAvailableZones(Intl.supportedValuesOf("timeZone")); } catch (e) { console.warn("Intl.supportedValuesOf not supported"); }

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    if (!window.location.search.includes("sourceZone")) { setState({ sourceZone: userTimezone }); }

    if (!sourceTime && !window.location.search.includes("sourceTime")) {
      const d = new Date();
      const pad = (n: number) => n.toString().padStart(2, "0");
      setState({ sourceTime: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` });
    }
  }, []);

  useEffect(() => { localStorage.setItem("hilmost_team_clocks", JSON.stringify(teamMembers)); }, [teamMembers]);

  const handleAddZone = () => {
    if (newZone && !targets.includes(newZone)) {
      setState({ targetZones: [...targets, newZone].join(",") });
      setNewZone("");
    }
  };

  const handleRemoveZone = useCallback((zoneToRemove: string) => {
    setState({ targetZones: targets.filter(z => z !== zoneToRemove).join(",") });
  }, [targets, setState]);

  const effectiveDate = useMemo(() => {
    if (!sourceTime) return now;
    const date = toDate(sourceTime, { timeZone: sourceZone });
    return Math.abs(date.getTime() - now.getTime()) < 2000 ? now : date;
  }, [sourceTime, sourceZone, now]);

  const handleAddMember = () => {
    if (newMemberName && newMemberTZ) {
      setTeamMembers([...teamMembers, { name: newMemberName, timezone: newMemberTZ }]);
      setNewMemberName(""); setNewMemberTZ("");
    }
  };

  const handleRemoveMember = useCallback((idx: number) => {
    setTeamMembers(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const shareTeamBoard = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("team", teamMembers.map(m => `${encodeURIComponent(m.name)}:${encodeURIComponent(m.timezone)}`).join(","));
    navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
    setShareStatus(true);
    setTimeout(() => setShareStatus(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-12 gap-8">
        <div id="tour-tz-source" className="md:col-span-5 space-y-6 bg-white dark:bg-slate-900 border border-[var(--color-border-base)] dark:border-slate-800 rounded-2xl p-4 md:p-5">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-2xl text-emerald-600 dark:text-emerald-400"><Clock className="w-6 h-6" /></div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-normal text-slate-800 dark:text-slate-100">Source Time</h2>
                {isDST(sourceZone) && <span className="text-[10px] font-normal bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded uppercase tracking-wider">DST</span>}
              </div>
              <p className="text-[10px] font-normal text-slate-400 uppercase tracking-widest tabular-nums">{formatInTimeZone(effectiveDate, sourceZone, "HH:mm:ss")}</p>
            </div>
          </div>
          <div className="space-y-4">
            <SearchableSelect label="Source Time Zone" value={sourceZone} options={availableZones} onChange={(val) => setState({ sourceZone: val })} />
            <DateTimePicker label="Date & Time" value={sourceTime} onChange={(val) => setState({ sourceTime: val })} />
          </div>
        </div>

        <div className="hidden md:flex md:col-span-1 items-center justify-center"><ArrowRight className="w-10 h-10 text-slate-300 dark:text-slate-700" /></div>

        <div id="tour-tz-targets" className="md:col-span-6 space-y-6 bg-white dark:bg-slate-900 border border-[var(--color-border-base)] dark:border-slate-800 rounded-2xl p-4 md:p-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4"><h2 className="text-xl font-normal text-slate-800 dark:text-slate-100">Converted Times</h2></div>
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {targets.map(zone => (
                <TargetZoneRow key={zone} zone={zone} date={effectiveDate} onRemove={() => handleRemoveZone(zone)} />
              ))}
            </AnimatePresence>
            {targets.length === 0 && <div className="text-center py-8 text-slate-500 font-normal text-sm">No target time zones selected.</div>}
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex gap-2 items-end">
              <SearchableSelect label="Add Time Zone" value={newZone} options={availableZones.filter(z => !targets.includes(z))} onChange={(val) => setNewZone(val)} className="flex-1" />
              <Button onClick={handleAddZone} disabled={!newZone} className="!px-6 !py-3 mb-0.5"><Plus className="w-6 h-6" /></Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-[var(--color-border-base)] dark:border-slate-800 rounded-2xl overflow-hidden mt-8 p-4 md:p-5">
        <button onClick={() => setIsTeamOpen(!isTeamOpen)} className="w-full flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center gap-3">
            <Users className="text-brand-primary w-6 h-6" />
            <div className="text-left">
              <h2 className="text-xl font-normal text-slate-800 dark:text-slate-100">My Team Clocks</h2>
              {isTeamOpen && <p className="text-[10px] font-normal text-slate-400 uppercase tracking-widest mt-1">Track your global team&apos;s availability instantly</p>}
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isTeamOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isTeamOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="p-6 pt-0 space-y-6 border-t border-slate-100 dark:border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-6 items-end">
                  <div className="sm:col-span-4"><Input label="Member Name" placeholder="e.g. Keepy" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} /></div>
                  <div className="sm:col-span-5"><SearchableSelect label="Time Zone" value={newMemberTZ} options={availableZones} onChange={(val) => setNewMemberTZ(val)} /></div>
                  <div className="sm:col-span-3"><Button onClick={handleAddMember} disabled={!newMemberName || !newMemberTZ} className="w-full !py-3 mb-0.5">Add Member</Button></div>
                </div>
                <div className="space-y-3">
                  {teamMembers.length > 0 ? teamMembers.map((member, i) => (
                    <TeamMemberRow key={i} member={member} now={now} onRemove={() => handleRemoveMember(i)} />
                  )) : (
                    <div className="py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-400">
                      <User size={32} className="mb-2 opacity-20" /><p className="text-sm font-normal">No team members yet.</p>
                    </div>
                  )}
                </div>
                {teamMembers.length >= 2 && (
                  <div className="flex justify-center pt-4 border-t border-slate-50 dark:border-slate-800/50">
                    <Button variant="secondary" onClick={shareTeamBoard} className="!px-6 !py-3">
                      {shareStatus ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      {shareStatus ? "Copied!" : "Share Team Board"}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
