import Tingle from "tingle.js";

//Function dynamically add the required CSS for the modal to the HEAD tag
function addStylesToHead(css) {
  const styleElement = document.createElement("style");
  styleElement.textContent = css;
  document.head.appendChild(styleElement);
}

const cssStyles = `
/* Your CSS styles go here */
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
  width:30px;
  float:right;
  position: relative;
  right: 2%;
  top: 2%;
  color:white !important;
  background: transparent;
  border: none;
  cursor:pointer;
}

.tingle-modal__closeLabel {
  display: none !important;
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

const modal = new Tingle.modal({
  footer: false,
  stickyFooter: false,
  closeMethods: ["button"], //"overlay", "button", "escape"
  //onOpen: function () {},
  //onClose: function () {},
  // beforeClose: function () {
  //   const timelyIframe = window?.document?.getElementById("timely-iframe");

  //   if (timelyIframe) {
  //     timelyIframe.contentWindow?.postMessage(
  //       { from: "react-timely", action: "close" },
  //       "*"
  //     );
  //   }
  // },
});

// Function to open the modal
export function openDittoTimely(eventName, params = {}, env = "prod") {
  if (!eventName) {
    console.error("Event Name is not available");
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
    `<iframe id="timely-iframe" style="width: 100%;height:100%;border:none;" src="${timelyUrlWithParams}"></iframe>`
  );

  modal.open();
  //window.addEventListener("message", handleMessage, false);
}

// Function to close the modal
export function closeDittoTimely() {
  modal.close();
}
