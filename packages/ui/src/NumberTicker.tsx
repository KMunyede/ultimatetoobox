"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

function formatWithCommas(str: string) {
  const parts = str.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

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

  const formatAbbreviated = (v: number) => {
    const absVal = Math.abs(v);
    if (absVal >= 1000000000) return `${prefix}${(v / 1000000000).toFixed(2)}B${suffix}`;
    if (absVal >= 1000000) return `${prefix}${(v / 1000000).toFixed(2)}M${suffix}`;

    const fixed = v.toFixed(decimals);
    return `${prefix}${formatWithCommas(fixed)}${suffix}`;
  };

  const fullValueTooltip = `${prefix}${value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })}${suffix}`;

  // Responsive font scaling for numbers just below 1M threshold (e.g. $999,999.99)
  const scaleStyle = useMemo(() => {
    const rawStr = value.toFixed(decimals);
    if (rawStr.length > 9) return { fontSize: '0.85em' };
    if (rawStr.length > 7) return { fontSize: '0.92em' };
    return {};
  }, [value, decimals]);

  const display = useTransform(springValue, (current) => {
    return formatAbbreviated(current);
  });

  if (!hasMounted) {
    return (
      <span title={fullValueTooltip} style={scaleStyle}>
        {formatAbbreviated(value)}
      </span>
    );
  }

  return (
    <motion.span title={fullValueTooltip} style={scaleStyle}>
      {display}
    </motion.span>
  );
}
