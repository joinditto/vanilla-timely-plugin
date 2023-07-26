import { openDittoTimely } from "vanilla-timely-plugin";

function openModal() {
  openDittoTimely("test", { campaign: "akshat", trend: "number1" }, "staging");
}

window.openModal = openModal;
