/* Offline shell cache for the webport.
 *
 * The game already stores its ~300 MB of WASM/data chunks in Cache Storage
 * (`gdwasm-assets`, written by the loader in index.html), so a boot without a
 * connection works once those files have been fetched. What was missing is the
 * page itself: with no network the browser cannot open index.html, so the
 * cached game files are unreachable. This worker keeps the shell in its own
 * cache and answers navigations from it when the network is gone.
 *
 * The game is a single page, so there is nothing else to cache here. Requests
 * for same-origin assets (the level relay, song files, texture packs) are left
 * alone on purpose: caching them would duplicate data the page already stores
 * and could serve stale levels.
 */
const VERSION = 'v1';
const CACHE = 'gd-shell-' + VERSION;
const CORE = ['/', '/index.html'];
const NAV_TIMEOUT_MS = 9000;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // addAll is all-or-nothing; add individually so one 404 cannot brick install.
    await Promise.all(CORE.map(async (url) => {
      try {
        const res = await fetch(new Request(url, { cache: 'reload' }));
        if (res && res.ok) await cache.put(url, res.clone());
      } catch (e) {
        /* offline install: the next online navigation fills it in */
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.map((name) =>
      name.startsWith('gd-shell-') && name !== CACHE ? caches.delete(name) : Promise.resolve()
    ));
    await self.clients.claim();
  })());
});

function timeout(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms));
}

async function shellResponse() {
  return (await caches.match('/')) ||
    (await caches.match('/index.html')) ||
    new Response(
      '<!doctype html><meta name=viewport content="width=device-width,initial-scale=1">' +
      '<body style="background:#000;color:#ddd;font:16px/1.6 system-ui;padding:24px">' +
      '<h1 style="font-size:20px">Geometry Dash Webport</h1>' +
      '<p>The game has not finished downloading on this device yet.</p>' +
      '<p>Connect to the internet once and let the game finish loading; after that it starts offline.</p>' +
      '<p><button onclick="location.reload()" style="font:16px monospace;padding:10px 14px">Retry</button></p>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return;
  if (url.pathname !== '/' && url.pathname !== '/index.html') return;

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const res = await Promise.race([fetch(req), timeout(NAV_TIMEOUT_MS)]);
        if (res && res.ok) {
          const cache = await caches.open(CACHE);
          cache.put('/', res.clone()).catch(() => {});
          return res;
        }
        throw new Error('bad status');
      } catch (e) {
        return shellResponse();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(req);
    const network = fetch(req).then((res) => {
      if (res && res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone())).catch(() => {});
      return res;
    }).catch(() => null);
    return cached || (await network) || new Response('', { status: 504 });
  })());
});
