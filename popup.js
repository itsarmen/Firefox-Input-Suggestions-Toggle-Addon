"use strict";

const KEY = "suggestionsEnabled";
const toggle = document.getElementById("toggle");
const status = document.getElementById("status");

function render(isOn) {
  toggle.checked = isOn;
  status.textContent = isOn ? "Enabled" : "Disabled";
  status.classList.toggle("off", !isOn);
}

async function load() {
  const stored = await browser.storage.local.get(KEY);
  render(stored[KEY] !== false);
}

toggle.addEventListener("change", async () => {
  const isOn = toggle.checked;
  render(isOn);
  await browser.storage.local.set({ [KEY]: isOn });
});

browser.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes[KEY]) render(changes[KEY].newValue !== false);
});

load();
