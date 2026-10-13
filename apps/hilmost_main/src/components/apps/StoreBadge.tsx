interface StoreBadgeProps {
  status: "coming-soon" | "live";
  storeUrl: string;
}

export function StoreBadge({ status, storeUrl }: StoreBadgeProps) {
  if (status === "coming-soon") {
    return (
      <span className="inline-flex items-center px-4 py-2 rounded-xl bg-emerald-800 text-white font-semibold text-sm shadow-sm">
        Coming to Google Play
      </span>
    );
  }

  return (
    <a
      href={storeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold transition-all shadow-md hover:scale-105 active:scale-95 text-sm"
    >
      Get on Google Play
    </a>
  );
}
