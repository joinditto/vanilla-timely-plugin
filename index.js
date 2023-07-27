import Tingle from "tingle.js";

//Function dynamically add the required CSS for the modal to the HEAD tag
function addStylesToHead(css) {
  const styleElement = document.createElement("style");
  styleElement.textContent = css;
  document.head.appendChild(styleElement);
}

const cssStyles = `
.parent-container{
  height:100vh
}

.tingle-modal {
  background-color: rgba(31, 31, 31, 0.4) !important;
  backdrop-filter: blur(1px) !important;
  position:absolute !important;
  top: 0% !important;
  left: 0% !important;
  z-index: 999999999 !important;
  width: 100% !important;
  height: 100vh !important;
}

.tingle-modal-box {
  margin-top:25px;
  display: flex;
  justify-content: center;
  width: 100% !important;
  height:100% !important
}

.tingle-modal-box__content {
  padding: 0px !important;
  width:980px !important
}

.tingle-enabled{
  overflow:hidden
}

.tingle-modal__close{
  display: none !important;
}

.tingle-modal__closeLabel {
  display: none !important;
}

.custom-close-button-timely{
  position:fixed;
  right:0px;
  top:0px;
  width:50px;
  height:50px;
  background:transparent;
  border:none;
  cursor:pointer;
}


@media (max-width: 980px) {
  .tingle-modal-box {
    width: 100% !important;
    margin-bottom: inherit !important;
    height: 695px !important;
    position: absolute;
    bottom: 0px;
  }
}

 @media (max-height: 668px) {
  .tingle-modal-box {
    height: 575px !important;
  }
}

.tingle-modal__close svg * {
  fill: currentColor;
}

@media (max-width: 540px) {
  .tingle-modal {
    bottom:0px !important
  }  
}

`;

addStylesToHead(cssStyles);

function timelyCreateMessageListener() {
  return new Promise((resolve) => {
    function listener(event) {
      const { data } = event;
      if (data.from === "timely" && data.action === "confirm-close") {
        resolve(true);
      } else {
        resolve(false);
      }

      // After receiving a message, we don't need the listener anymore
      window.removeEventListener("message", listener);
    }

    window.addEventListener("message", listener);
  });
}

const modal = new Tingle.modal({
  closeMethods: ["button"], //"overlay", "button", "escape"
});

async function timelyHandleCloseButtonClick() {
  const timelyIframe = window?.document?.getElementById("timely-iframe");

  if (timelyIframe) {
    timelyIframe.contentWindow?.postMessage(
      { from: "react-timely", action: "close" },
      "*"
    );
  }

  const closeModal = await timelyCreateMessageListener();
  if (closeModal) {
    modal.close();
    const closeButton = window.document.getElementById("close-button-timely");
    closeButton.removeEventListener("click", timelyHandleCloseButtonClick);
  }
}

// Function to open the modal
export function openTimely(eventName, params = {}, env = "prod") {
  if (!eventName) {
    console.error("vanilla-timely: Event name is not provided.");
    return;
  }

  const timelyUrlStaging = `https://test-timely.joinditto.in/event/${eventName}/book`;
  const timelyUrlProd = `https://timely.joinditto.in/event/${eventName}/book`;

  const timelyUrl = env === "prod" ? timelyUrlProd : timelyUrlStaging;

  // Convert params object into URL query parameters
  const utmParamsString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  const timelyUrlWithParams = utmParamsString
    ? `${timelyUrl}?${utmParamsString}`
    : timelyUrl;

  // set content
  modal.setContent(
    `
    <div class="parent-container">
    <button id="close-button-timely" class="custom-close-button-timely">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 15 15"><path fill="#FFFFFF" fill-rule="evenodd" d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5l3.469-3.468Z" clip-rule="evenodd"/></svg>
    </button>
    <iframe id="timely-iframe" style="width: 100%;height:100%;border:none;" src="${timelyUrlWithParams}"></iframe>
    <div>
    `
  );

  const closeButton = window.document.getElementById("close-button-timely");
  closeButton.addEventListener("click", timelyHandleCloseButtonClick);

  modal.open();
}

// Function to close the modal
export function closeTimely() {
  modal.close();
}
