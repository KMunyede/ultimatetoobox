export function GamesPrivacySection() {
  return (
    <div className="mt-8 pt-8 border-t border-base space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-text-primary">Mobile games (Ultimate TicTacToe)</h2>

      <div>
        <h3 className="text-lg font-semibold text-text-primary">Who</h3>
        <p className="text-text-secondary mt-1">Hilmost Software Corporation, Harare, Zimbabwe; contact support@hilmost.net.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary">Collected</h3>
        <p className="text-text-secondary mt-1">Email (email sign-in); name and email (Google sign-in); username and user ID; game stats, saved game, settings; an anonymous ID for guests; sign-in attempt counts linked to username and a one-way hashed IP, deleted after about a day; advertising ID, IP address and device info for ads via Google AdMob. Never collected: location, contacts, photos, microphone, payments, date of birth; no analytics or crash tools. Passwords are handled by Google Firebase Authentication; we never see them.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary">Use</h3>
        <p className="text-text-secondary mt-1">Run your account, save progress, security, show ads that fund the games, support. We do not sell personal data.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary">Processors</h3>
        <p className="text-text-secondary mt-1">Google (Firebase Authentication, Cloud Firestore, Cloud Functions) and Google AdMob (links <a href="https://policies.google.com/privacy" className="text-brand-primary underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a> and <a href="https://policies.google.com/technologies/partner-sites" className="text-brand-primary underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/partner-sites</a>).</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary">Ads</h3>
        <p className="text-text-secondary mt-1">In the EU, UK and Switzerland a consent form asks first; anywhere, reset advertising ID or turn off personalisation in Android Settings &gt; Google &gt; Ads.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary">Where</h3>
        <p className="text-text-secondary mt-1">Google data centres in South Africa; sign-in function in the United States.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary">Retention</h3>
        <p className="text-text-secondary mt-1">Kept until you delete your account; on deletion your data is hidden at once and permanently erased after 30 days; restore by signing in within 30 days or choose Delete now to erase immediately; sign-in attempt records removed after about a day.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary">Rights</h3>
        <p className="text-text-secondary mt-1">See, correct, delete, withdraw consent, object; complaint to POTRAZ or your local authority.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary">Children</h3>
        <p className="text-text-secondary mt-1">Not directed to children under 13.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary">Security</h3>
        <p className="text-text-secondary mt-1">Google infrastructure, per-player access rules, encryption in transit, sign-in limits. Changes posted here. Section effective 4 October 2026.</p>
      </div>
    </div>
  );
}
