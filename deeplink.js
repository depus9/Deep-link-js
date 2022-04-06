
(function () {
  "use strict";

  /****************************************************************
   * SUPPORTED USER AGENTS
   ****************************************************************/

  var OSs = {
    android: {
      store_prefix: "https://play.google.com/store/apps/details?id=",
      test: /Android/i,
    },

    iOS: {
      store_prefix: "https://itunes.apple.com/en/app/id",
      test: /iPhone|iPad|iPod/i,
    },
  };

  /****************************************************************
   * FUNCTIONS
   ****************************************************************/

  // Get user agent
  var getUserAgent = function () {
    var k;

    for (k in OSs) {
      if (navigator.userAgent.match(OSs[k].test)) return k;
    }
  };

  // Get current time in ms
  var getTime = function () {
    return new Date().getTime();
  };

  // Parse a single element
  var parseElement = function () {
    var OS = getUserAgent(),
      href = window.location.href,
      app = OS == "android" ? "" : "", //add conditional app url
      store = OS == "android" ? "" : ""; // add conditional sore url

    if (!app) return;

    if (OS && app) {
      // Hijack click event

      var start = getTime();
      var delay = 2000;

      // Go to app
      window.location.href = app;

      // Timeout to detect if the link worked
      // TODO Cross-OS implementation?
      // Only works on iOS
      // https://gist.github.com/pulletsforever/2662899
      setTimeout(function () {
        var now = getTime();

        // Do nothing if the user has been away for a while
        if (now >= start + delay * 2) return;

        if (store) {
          // Go to the store
          window.location.href = OSs[OS].store_prefix + store;
        } else if (href) {
          window.location.href = href;
        }
      }, delay);
    } else if (!href || href === "#") {
      // Apps are presumably not supported
      el.style.display = "none";
    }
  };

  /****************************************************************
   * INITIALIZE
   ****************************************************************/

  parseElement();
})();
