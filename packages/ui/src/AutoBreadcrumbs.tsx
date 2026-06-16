"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs } from "./Breadcrumbs";

function formatLabel(segment: string) {
  // Replace hyphens with spaces and capitalize words
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function AutoBreadcrumbs() {
  const pathname = usePathname();

  // If we are on the home page, don't show breadcrumbs
  if (!pathname || pathname === "/") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  
  const items = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return {
      label: formatLabel(segment),
      href,
    };
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      <Breadcrumbs items={items} />
    </div>
  );
}
