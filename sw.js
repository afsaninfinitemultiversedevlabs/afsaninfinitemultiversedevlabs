
const CACHE_NAME = "aimdl-cache-v3";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./offline.html",

  "./Afsan/index.html",
  "./Afsan/style.css",

  "./Infinite/index.html",
  "./Infinite/style.css",

  "./Multiverse/index.html",
  "./Multiverse/style.css",

  "./DevLabs/index.html",
  "./DevLabs/style.css",

  "./Ventures/index.html",
  "./Ventures/style.css",

  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      await Promise.all(
        ASSETS.map(async (asset) => {
          try {
            const response = await fetch(asset);

            if (response.ok) {
              await cache.put(asset, response);
            }
          } catch (error) {
            console.log("Could not cache:", asset);
          }
        })
      );

      await self.skipWaiting();
    })()
  );
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter((key) => key.startsWith("aimdl-cache-") &&
                           key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );

      await self.clients.claim();
    })()
  );
});

// FETCH
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request);

      if (cached) return cached;

      try {
        const response = await fetch(event.request);

        if (response.ok && response.type === "basic") {
          const cache = await caches.open(CACHE_NAME);

          await cache.put(
            event.request,
            response.clone()
          );
        }

        return response;

      } catch (error) {
        if (event.request.mode === "navigate") {
          return await caches.match("./offline.html");
        }

        return new Response("Offline", {
          status: 503
        });
      }
    })()
  );
});
