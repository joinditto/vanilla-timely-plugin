function timelyAddStylesToHead(css) {
  const styleElement = document.createElement("style");
  styleElement.textContent = css;
  document.head.appendChild(styleElement);
}

const timelyCssStyles = `
/* overlay */
.timely-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(31,31,31,0.4);
  display: none;
}

.timely-overlay--visible {
  display: block;
}

/* lock page scroll when modal is open */
html.timely-open,
html.timely-open body {
  overflow: hidden !important;
  height: 100% !important;
}

/* desktop: >=960px (matches react-timely Md) */
.timely-iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(calc(-50% - 2px)) translateY(calc(-50% - 2px));
  width: 80%;
  min-width: 900px;
  max-width: 1060px;
  height: 100%;
  max-height: 620px;
  border: none;
  background: transparent;
}

/* tablet: 768-959px (matches react-timely Sm) */
@media (max-width: 959px) {
  .timely-iframe {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: none;
    width: 100%;
    min-width: 0;
    max-width: 660px;
    max-height: none;
    height: auto;
    margin: auto;
    inset: 50px 0px;
  }
}

/* mobile: <768px - bottom sheet */
@media (max-width: 767px) {
  .timely-iframe {
    position: absolute;
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
    transform: none;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    height: 85vh;
    margin: 0;
  }
}

/* loading spinner */
.timely-loader-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: -1;
}

.timely-loader-wrap svg {
  width: 75px;
  height: 57px;
}

.timely-iframe--loading {
  visibility: hidden;
}

.timely-loader-wrap--hidden {
  display: none;
}
`;

timelyAddStylesToHead(timelyCssStyles);

// --- Loader SVG (from react-timely-plugin/src/assets/loader.svg) ---

const timelyLoaderSvg = `<svg xmlns="http://www.w3.org/2000/svg" style="margin:auto;background:none;display:block;shape-rendering:auto" width="200" height="200" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="84" cy="50" r="10" fill="#3dabf5"><animate attributeName="r" repeatCount="indefinite" dur="0.926s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"/><animate attributeName="fill" repeatCount="indefinite" dur="3.704s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#3dabf5;#ffffff;#3dabf5;#ffffff;#3dabf5" begin="0s"/></circle><circle cx="16" cy="50" r="10" fill="#3dabf5"><animate attributeName="r" repeatCount="indefinite" dur="3.704s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"/><animate attributeName="cx" repeatCount="indefinite" dur="3.704s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"/></circle><circle cx="50" cy="50" r="10" fill="#fff"><animate attributeName="r" repeatCount="indefinite" dur="3.704s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.926s"/><animate attributeName="cx" repeatCount="indefinite" dur="3.704s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.926s"/></circle><circle cx="84" cy="50" r="10" fill="#3dabf5"><animate attributeName="r" repeatCount="indefinite" dur="3.704s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.852s"/><animate attributeName="cx" repeatCount="indefinite" dur="3.704s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.852s"/></circle><circle cx="16" cy="50" r="10" fill="#fff"><animate attributeName="r" repeatCount="indefinite" dur="3.704s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-2.778s"/><animate attributeName="cx" repeatCount="indefinite" dur="3.704s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-2.778s"/></circle></svg>`;

// --- Modal DOM ---

// The overlay is created lazily on first open so that simply importing this
// module never touches document.body (which may not exist yet if the script
// is loaded in <head>).
let timelyOverlay = null;

function timelyGetOverlay() {
  if (!timelyOverlay) {
    timelyOverlay = document.createElement("div");
    timelyOverlay.className = "timely-overlay";
    document.body.appendChild(timelyOverlay);
  }
  return timelyOverlay;
}

// --- Helpers ---

// Origins the Timely iframe is served from. Close messages from any other
// origin/source are ignored so arbitrary scripts on the host page can't
// force the modal closed.
const TIMELY_ALLOWED_ORIGINS = [
  "https://timely.joinditto.in",
  "https://test-timely.joinditto.in",
];

function timelyMessageListener(event) {
  if (!TIMELY_ALLOWED_ORIGINS.includes(event.origin)) return;

  const iframe = document.getElementById("timely-iframe");
  if (!iframe || event.source !== iframe.contentWindow) return;

  const { data } = event;
  if (data && data.from === "timely" && data.action === "confirm-close") {
    closeTimely();
  }
}

// --- Public API ---

/**
 * Opens the Ditto Timely booking modal.
 *
 * @param {string} eventName - The Timely event name (required).
 * @param {Object} [params={}] - UTM and custom query params for the iframe URL.
 * @param {string} [env="prod"] - "prod" or "staging".
 * @param {Object} [options={}] - Additional configuration.
 * @param {Object} [options.embed] - Override embed params (embed_type, embed_domain, embed_path).
 * @param {Object} [options.prefill] - Prefill form fields (name, email, phone, product, query, date).
 */
export function openTimely(
  eventName,
  params = {},
  env = "prod",
  options = {}
) {
  if (!eventName) {
    console.error("vanilla-timely: Event name is not provided.");
    return;
  }

  const encodedEventName = encodeURIComponent(eventName);
  const timelyUrlStaging = `https://test-timely.joinditto.in/event/${encodedEventName}/book`;
  const timelyUrlProd = `https://timely.joinditto.in/event/${encodedEventName}/book`;
  const timelyUrl = env === "prod" ? timelyUrlProd : timelyUrlStaging;

  // Extract embed and prefill from options, with defaults
  const { embed: embedOverrides = {}, prefill = {} } = options;

  const embed = {
    embed_type: "popup",
    embed_domain: window.location.host,
    embed_path: window.location.pathname,
    ...embedOverrides,
  };

  // Build allParams: caller params + embed + prefill (filtering out null/undefined)
  const allParams = {};

  for (const [k, v] of Object.entries(params)) {
    if (v != null) allParams[k] = v;
  }

  for (const [k, v] of Object.entries(embed)) {
    if (v != null) allParams[k] = v;
  }

  for (const [k, v] of Object.entries(prefill)) {
    if (v != null) allParams[k] = v;
  }

  const queryString = Object.entries(allParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  const timelyUrlWithParams = `${timelyUrl}?${queryString}`;

  // Build DOM elements instead of innerHTML to avoid XSS via interpolated URLs
  const overlay = timelyGetOverlay();
  overlay.innerHTML = "";

  const loader = document.createElement("div");
  loader.className = "timely-loader-wrap";
  loader.id = "timely-loader";
  loader.innerHTML = timelyLoaderSvg;

  const iframeEl = document.createElement("iframe");
  iframeEl.id = "timely-iframe";
  iframeEl.className = "timely-iframe timely-iframe--loading";
  iframeEl.src = timelyUrlWithParams;
  iframeEl.title = "Ditto Timely";

  overlay.appendChild(loader);
  overlay.appendChild(iframeEl);

  // When iframe loads, hide loader and show iframe
  iframeEl.addEventListener("load", function onLoad() {
    iframeEl.classList.remove("timely-iframe--loading");
    loader.classList.add("timely-loader-wrap--hidden");
    iframeEl.removeEventListener("load", onLoad);
  });

  // Listen for close message from iframe
  window.addEventListener("message", timelyMessageListener);

  // Show
  overlay.classList.add("timely-overlay--visible");
  document.documentElement.classList.add("timely-open");
}

export function closeTimely() {
  // Notify the iframe before hiding (mirrors react-timely's close behavior)
  const iframe = document.getElementById("timely-iframe");
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(
      { from: "react-timely", action: "close" },
      "*"
    );
  }

  if (timelyOverlay) {
    timelyOverlay.classList.remove("timely-overlay--visible");
    timelyOverlay.innerHTML = "";
  }
  document.documentElement.classList.remove("timely-open");
  window.removeEventListener("message", timelyMessageListener);
}
