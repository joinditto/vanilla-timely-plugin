import { openDittoTimely } from "vanilla-timely-plugin";

function openModal() {
  openDittoTimely("stag", "test", { campaign: "akshat", trend: "number1" });
}

window.openModal = openModal;
