/* Service worker: keeps the app, config, Firebase SDK and fonts for offline use.
   After changing index.html or config.js, bump VERSION so phones fetch the new copy. */
var VERSION = "fahim-gh-v1";
var CORE = ["./", "index.html", "config.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png"];
var SDK = ["app", "auth", "firestore"].map(function (n) { return "https://www.gstatic.com/firebasejs/10.14.1/firebase-" + n + "-compat.js"; });
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) {
    var sdk = Promise.all(SDK.map(function (u) { return c.add(new Request(u, { mode: "no-cors" })).catch(function () {}); }));
    return Promise.all([c.addAll(CORE), sdk]);
  }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
function isStatic(url) {
  return url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com" ||
    (url.hostname === "www.gstatic.com" && url.pathname.indexOf("/firebasejs/") === 0);
}
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (isStatic(url)) {
    e.respondWith(caches.open(VERSION).then(function (c) {
      return c.match(req).then(function (hit) {
        var net = fetch(req).then(function (res) { c.put(req, res.clone()); return res; }).catch(function () { return hit; });
        return hit || net;
      });
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  e.respondWith(fetch(req).then(function (res) {
    var copy = res.clone();
    caches.open(VERSION).then(function (c) { c.put(req, copy); });
    return res;
  }).catch(function () {
    return caches.match(req, { ignoreSearch: true }).then(function (hit) {
      return hit || (req.mode === "navigate" ? caches.match("index.html") : Response.error());
    });
  }));
});
