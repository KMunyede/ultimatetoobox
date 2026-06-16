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
    return `${prefix}${current.toFixed(decimals)}${suffix}`;
  });

  if (!hasMounted) {
    return <span>{prefix}{value.toFixed(decimals)}{suffix}</span>;
  }

  return <motion.span>{display}</motion.span>;
}
