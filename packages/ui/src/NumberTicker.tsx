"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export function NumberTicker({
  value,
  duration = 1,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    springValue.set(value);
  }, [value, springValue]);

  const display = useTransform(springValue, (current) => {
    const fixed = current.toFixed(decimals);
    const parts = fixed.split(".");
    // Add commas for 3-digit grouping
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${prefix}${parts.join(".")}${suffix}`;
  });

  if (!hasMounted) {
    const raw = value.toFixed(decimals);
    const p = raw.split(".");
    p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return <span>{prefix}{p.join(".")}{suffix}</span>;
  }

  return <motion.span>{display}</motion.span>;
}
