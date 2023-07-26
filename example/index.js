import { openDittoTimely } from "vanilla-timely-plugin";

function openModal() {
  console.log("called");
  openDittoTimely(test);
}

window.openModal = openModal;
