export function GamesPrivacySection() {
  return (
    <div className="mt-8 pt-8 border-t border-base space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-text-primary">Ultimate TicTacToe</h2>
      <p className="text-text-secondary mt-1">
        Ultimate TicTacToe&apos;s privacy policy has moved to{" "}
        <a href="https://hilmost.net/apps/ultimate-tic-tac-toe/privacy" className="text-emerald-800 underline" target="_blank" rel="noopener noreferrer">
          https://hilmost.net/apps/ultimate-tic-tac-toe/privacy
        </a>
        . Section effective 14 October 2026.
      </p>

      <div id="2048-grandmasters" className="mt-8 pt-8 border-t border-base space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-text-primary">2048 GrandMasters</h2>
        <p className="text-text-secondary mt-1">This section applies from the version of 2048 GrandMasters that includes the first-launch consent screen.</p>

        <div>
          <h3 className="text-lg font-semibold text-text-primary">Who</h3>
          <p className="text-text-secondary mt-1">Hilmost, contact support@hilmost.net. App: 2048 GrandMasters (Android).</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-text-primary">Collected</h3>
          <p className="text-text-secondary mt-1">The app has no accounts or login and does not collect personal data itself. The only data leaving the device goes through Google AdMob: the advertising ID and ad-related device data, used to serve and measure ads.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-text-primary">Use</h3>
          <p className="text-text-secondary mt-1">Only to show and measure ads, and to check Google Play for updates (at most once a day, plus a &quot;Check for updates&quot; button in Settings). This sends nothing to Hilmost and Hilmost collects no new data. No analytics, no crash reporting, no Firebase.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-text-primary">Processors</h3>
          <p className="text-text-secondary mt-1">Google AdMob (<a href="https://policies.google.com/technologies/ads" className="text-brand-primary underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>).</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-text-primary">Ads</h3>
          <p className="text-text-secondary mt-1">Banner, interstitial and rewarded ads. No app-open ads. On first launch a consent screen asks the player to agree or decline. Ads and the advertising ID start only after &quot;I agree&quot;. If declined on first launch, the ads SDK is not started. If switched off later via the &quot;Ads&quot; on/off switch in Settings, the player sees no ads and no ad offers. The player can change the choice there at any time. Region-specific consent for the EEA and UK will be added before wider release.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-text-primary">Where</h3>
          <p className="text-text-secondary mt-1">Stored on the device only, never sent anywhere: high score, game mode, target value, selected theme, daily-challenge date, daily streak, best daily streak, consent choice and consent version, ads on/off choice, time of last update check.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-text-primary">Retention</h3>
          <p className="text-text-secondary mt-1">Uninstalling the app or clearing app data removes all local data. Ad data held by Google is governed by Google policies (<a href="https://policies.google.com/technologies/ads" className="text-brand-primary underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>); the player can reset or delete their advertising ID in Android Settings &gt; Google &gt; Ads. The player can change their ads choice in Settings at any time.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-text-primary">Rights</h3>
          <p className="text-text-secondary mt-1">Questions or requests: support@hilmost.net.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-text-primary">Children</h3>
          <p className="text-text-secondary mt-1">2048 GrandMasters is intended for users aged 13 and over and is not directed at children under 13.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-text-primary">Security</h3>
          <p className="text-text-secondary mt-1">Nothing personal is stored by the app; ad data is handled by Google under its own policies.</p>
        </div>
      </div>
    </div>
  );
}
