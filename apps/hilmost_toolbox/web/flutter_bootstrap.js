{{flutter_js}}
{{flutter_build_config}}

// Disable the Service Worker permanently.
// This forces Flutter Web to fetch fresh files and never cache them locally.
_flutter.buildConfig.serviceWorkerVersion = null;

_flutter.loader.load({
  onEntrypointLoaded: async function(engineInitializer) {
    const appRunner = await engineInitializer.initializeEngine({
      // We can also pass custom initialization here if needed
    });

    // Fade out and remove the assembling loading screen
    const loader = document.getElementById('loading-indicator');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }

    await appRunner.runApp();
  }
});
