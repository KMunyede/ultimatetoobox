import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://hilmost.net/delete-account" },
  title: "Delete your Hilmost account and data | Hilmost",
  description: "Instructions for deleting your Hilmost account and associated game data.",
  openGraph: {
    title: "Delete your Hilmost account and data | Hilmost",
    description: "Instructions for deleting your Hilmost account and associated game data.",
  },
  twitter: {
    title: "Delete your Hilmost account and data | Hilmost",
    description: "Instructions for deleting your Hilmost account and associated game data.",
  },
};

export default function DeleteAccountPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-text-primary">Delete your Hilmost account and data</h1>

      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          <strong>In the app: </strong>Profile &gt; Delete account &gt; type DELETE &gt; confirm; hidden at once, erased after 30 days; sign in within 30 days and tap Restore to change your mind, or Delete now to erase at once.
        </p>
        <p>
          <strong>If you cannot open the app: </strong>email support@hilmost.net from the account address, subject &quot;Delete my account&quot;, with your username (Google sign-in: your Google email); we confirm and delete within 30 days at the latest.
        </p>
        <p>
          <strong>What we delete: </strong>sign-in account, email, username (available to others once erased), stats, saved games, cloud settings.
        </p>
        <p>
          <strong>What we keep: </strong>nothing that identifies you after erasure.
        </p>
        <p>
          <strong>Guests: </strong>not linked to identity; uninstalling removes local data.
        </p>
        <p>
          <strong>Advertising data: </strong>held by Google AdMob under Google policies.
        </p>
        <p>
          <strong>Questions: </strong>support@hilmost.net.
        </p>
      </div>
    </div>
  );
}
