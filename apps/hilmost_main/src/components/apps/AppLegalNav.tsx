import Link from "next/link";

interface AppLegalNavProps {
  slug: string;
  currentPage: "about" | "privacy" | "terms" | "delete-account";
  contactEmail: string;
}

export function AppLegalNav({ slug, currentPage, contactEmail }: AppLegalNavProps) {
  const base = `/apps/${slug}`;

  const linkClass = (page: string) =>
    currentPage === page
      ? "font-bold text-text-primary underline decoration-2 underline-offset-4"
      : "hover:text-text-primary transition-colors";

  return (
    <nav aria-label="App Legal and Support Navigation" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm pt-8 mt-8 border-t border-base text-text-secondary">
      <Link href={base} className={linkClass("about")}>
        About
      </Link>
      <span>·</span>
      <Link href={`${base}/privacy`} className={linkClass("privacy")}>
        Privacy
      </Link>
      <span>·</span>
      <Link href={`${base}/terms`} className={linkClass("terms")}>
        Terms
      </Link>
      <span>·</span>
      <Link href={`${base}/delete-account`} className={linkClass("delete-account")}>
        Delete account
      </Link>
      <span>·</span>
      <a href={`mailto:${contactEmail}`} className="hover:text-text-primary transition-colors">
        Support ({contactEmail})
      </a>
    </nav>
  );
}
