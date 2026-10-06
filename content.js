(() => {
  "use strict";

  const KEY = "suggestionsEnabled";
  const SKIP_TYPES = new Set([
    "hidden", "submit", "button", "reset", "image", "file",
    "checkbox", "radio", "range", "color", "date", "time",
    "datetime-local", "month", "week"
  ]);

  const TRACKED = new Map();
  const OBSERVED = new WeakSet();

  let enabled = true;

  function isField(el) {
    return el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA");
  }

  function shouldHandle(el) {
    if (el.tagName === "TEXTAREA") return true;
    if (el.tagName !== "INPUT") return false;
    const type = (el.getAttribute("type") || "text").toLowerCase();
    return !SKIP_TYPES.has(type);
  }

  function disableField(el) {
    if (!shouldHandle(el)) return;
    if (el.getAttribute("autocomplete") === "off") return;
    if (!TRACKED.has(el)) TRACKED.set(el, el.getAttribute("autocomplete"));
    el.setAttribute("autocomplete", "off");
  }

  function restoreField(el) {
    if (!TRACKED.has(el)) return;
    const original = TRACKED.get(el);
    if (original === null) el.removeAttribute("autocomplete");
    else el.setAttribute("autocomplete", original);
    TRACKED.delete(el);
  }

  function collectFields(root) {
    const fields = [];
    if (!root) return fields;
    if (root.nodeType === Node.ELEMENT_NODE && root.matches("input, textarea")) {
      fields.push(root);
    }
    if (root.querySelectorAll) {
      root.querySelectorAll("input, textarea").forEach((el) => fields.push(el));
    }
    return fields;
  }

  function eachField(root, callback) {
    if (!root) return;
    collectFields(root).forEach(callback);

    const hosts = [];
    if (root.nodeType === Node.ELEMENT_NODE && root.shadowRoot) hosts.push(root.shadowRoot);
    if (root.querySelectorAll) {
      root.querySelectorAll("*").forEach((el) => {
        if (el.shadowRoot) hosts.push(el.shadowRoot);
      });
    }
    hosts.forEach((shadow) => {
      observe(shadow);
      eachField(shadow, callback);
    });
  }

  function observe(root) {
    if (!root || OBSERVED.has(root)) return;
    OBSERVED.add(root);

    const observer = new MutationObserver((records) => {
      if (enabled) return;
      for (const record of records) {
        if (record.type === "attributes") {
          disableField(record.target);
          continue;
        }
        record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) eachField(node, disableField);
        });
      }
    });

    observer.observe(root, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["autocomplete"]
    });

    if (!enabled) eachField(root, disableField);
  }

  function applyAll() {
    if (enabled) {
      Array.from(TRACKED.keys()).forEach(restoreField);
    } else {
      eachField(document.documentElement, disableField);
    }
  }

  function applyState(next) {
    enabled = next !== false;
    applyAll();
  }

  function start() {
    observe(document.documentElement);
    applyState(enabled);

    browser.storage.onChanged.addListener((changes, area) => {
      if (area !== "local" || !changes[KEY]) return;
      applyState(changes[KEY].newValue);
    });
  }

  async function init() {
    try {
      const stored = await browser.storage.local.get(KEY);
      enabled = stored[KEY] !== false;
    } catch (e) {
      enabled = true;
    }

    if (document.documentElement) {
      start();
    } else {
      const ready = new MutationObserver(() => {
        if (!document.documentElement) return;
        ready.disconnect();
        start();
      });
      ready.observe(document, { childList: true });
    }
  }

  init();
})();
