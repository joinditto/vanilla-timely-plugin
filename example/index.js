import { openTimely } from "@ditto-insurance/vanilla-timely";

function openModal() {
  openTimely("test", { utm_source: "example", utm_campaign: "demo" }, "staging", {
    prefill: { name: "Test User" },
  });
}

window.openModal = openModal;
