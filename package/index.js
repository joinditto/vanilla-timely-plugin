// Function to open the modal
function openModal() {
  var modal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ["button"], //"overlay", "button", "escape"
    closeLabel: "Close",
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
  // modal.setContent(
  //   `<iframe style="width: 100%;height:100%;" src="https://test-timely.joinditto.in/event/test/book?hotline=True"></iframe>`
  // );

  modal.setContent("<h1>some content here");

  modal.open();
}

// Add event listener to the button
const openModalButton = document.getElementById("openModalButton");
openModalButton.addEventListener("click", openModal);
