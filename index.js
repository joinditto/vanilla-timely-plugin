// --- CSS (matches react-timely-plugin's TimelyModal.tsx) ---

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
  z-index: 999999999;
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
  height: 85vh;
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
`;

timelyAddStylesToHead(timelyCssStyles);

// --- Modal DOM ---

const timelyOverlay = document.createElement("div");
timelyOverlay.className = "timely-overlay";
document.body.appendChild(timelyOverlay);

// --- Helpers ---

// The iframe's Timely page sends a postMessage to confirm close
function timelyMessageListener(event) {
  const { data } = event;
  if (data.from === "timely" && data.action === "confirm-close") {
    closeTimely();
  }
}

// --- Public API ---

export function openTimely(
  eventName,
  params = {},
  closeMethods = [],
  env = "prod"
) {
  if (!eventName) {
    console.error("vanilla-timely: Event name is not provided.");
    return;
  }

  const timelyUrlStaging = `https://test-timely.joinditto.in/event/${eventName}/book`;
  const timelyUrlProd = `https://timely.joinditto.in/event/${eventName}/book`;
  const timelyUrl = env === "prod" ? timelyUrlProd : timelyUrlStaging;

  // Combine UTM params with embed params (so iframe shows its own close button)
  const allParams = {
    ...params,
    embed_type: "popup",
    embed_domain: window.location.host,
    embed_path: window.location.pathname,
  };

  const queryString = Object.entries(allParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  const timelyUrlWithParams = `${timelyUrl}?${queryString}`;

  timelyOverlay.innerHTML = `
    <iframe id="timely-iframe" class="timely-iframe" src="${timelyUrlWithParams}"></iframe>
  `;

  // Listen for close message from iframe
  window.addEventListener("message", timelyMessageListener);

  // Show
  timelyOverlay.classList.add("timely-overlay--visible");
  document.documentElement.classList.add("timely-open");
}

export function closeTimely() {
  timelyOverlay.classList.remove("timely-overlay--visible");
  document.documentElement.classList.remove("timely-open");
  window.removeEventListener("message", timelyMessageListener);
}
