"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs } from "./Breadcrumbs";
import { BreadcrumbSchema } from "./SchemaMarkup";

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

  // Skip auto-breadcrumbs for tool pages that handle their own breadcrumbs for SEO
  // This prevents double-rendering and ensures we use the precise labels defined in those pages
  const isToolPage = pathname.split("/").length > 2;
  if (isToolPage) {
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-1 pb-0">
      <Breadcrumbs items={items} />
    </div>
  );
}
