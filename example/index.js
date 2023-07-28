import { openTimely } from "vanilla-timely-plugin";

function openModal() {
  openTimely("test", { campaign: "akshat", trend: "number1" }, [], "staging");
}

window.openModal = openModal;
