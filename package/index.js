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
  backdrop-filter: none !important;
}

.tingle-modal-box {
  height: 500px !important;
  width: 800px !important;
}

.tingle-modal-box__content {
  padding: 0px !important;
  height: 100% !important;
}

@media (max-width: 800px) {
  .tingle-modal-box {
    width: 100% !important;
    margin-bottom: inherit !important;
    height: 725px !important;
  }
}

@media (max-height: 800px) {
  .tingle-modal-box {
    height: 575px !important;
  }
}

@media (max-width: 540px) {
  .tingle-modal {
    top: auto !important;
    height: 100% !important;
    display: flex !important;
  }

  .tingle-modal__close {
    background: transparent !important;
    right: 1px !important;
    display: flex !important;
    justify-content: end;
    margin-top: 15px !important;
  }

  .tingle-modal__closeLabel {
    display: none !important;
  }
}

`;

addStylesToHead(cssStyles);

// Function to open the modal
function openModal() {
  var modal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ["button"], //"overlay", "button", "escape"
    onOpen: function () {
      console.log("modal open");
    },
    onClose: function () {
      console.log("modal closed");
    },
    beforeClose: function () {
      // here's goes some logic
      // e.g. save content before closing the modal
      return true; // close the modal
    },
  });

  // set content
  modal.setContent(
    `<iframe style="width: 100%;height:100%;border:none" src="https://test-timely.joinditto.in/event/test/book?hotline=True"></iframe>`
  );

  modal.open();
}

// Add event listener to the button
const openModalButton = document.getElementById("openModalButton");
openModalButton.addEventListener("click", openModal);
