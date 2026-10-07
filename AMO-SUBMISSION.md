# AMO Submission — Input Suggestions Toggle

Copy/Paste cheat sheet for the Mozilla Add-ons (addons.mozilla.org) submission form.

---

## Describe Add-on

**Name:**
```
Input Suggestions Toggle
```

**Add-on URL:**
```
input-suggestions-toggle
```
(full URL becomes `https://addons.mozilla.org/firefox/addon/input-suggestions-toggle`)

**Summary:** (shown in listings/search, used by reviewers)
```
Toggle browser input value suggestions (form autofill history) on or off for every website with one click.
```

**Description:** (product page; first 250 chars matter most)
```
Input Suggestions Toggle gives you one-click control over the browser's native input value suggestions — the dropdown of previously typed values (form autofill history) that appears under text fields.

Firefox and Waterfox do not expose the browser.formfill.enable preference to regular extensions, so this add-on uses the standard approach: a content script sets autocomplete="off" on text inputs and textareas, which suppresses the value-suggestion dropdown. Password-manager (login) filling is separate and is not affected.

Features:
- One-click toggle from the toolbar popup.
- Applies to all sites, all frames, and shadow DOM.
- Restores each field's original autocomplete value when suggestions are re-enabled.
- The setting is saved and synced live to all open tabs.
- Lightweight, no background page, no external requests, no data collection.

Usage:
1. Click the toolbar icon.
2. Flip the switch: On = native suggestions enabled (default). Off = suggestions disabled on all sites.
```

**This add-on is experimental?**
```
No
```

**This add-on requires payment, non-free services or software, or additional hardware?**
```
No
```

**Categories:** (select up to 3)
```
Privacy & Security
```

**Support email:**
```
amoswaper@gmail.com
```

**Support website:**
```
https://github.com/itsarmen
```

**License:**
```
MIT License
```
(Change this if you prefer a different license — no LICENSE file currently exists in the repo.)

**This add-on has a Privacy Policy?**
```
Yes
```

**Privacy Policy:**
```
Input Suggestions Toggle does not collect, store, transmit, or share any personal data.

The add-on only stores a single on/off preference locally using the browser's storage API. This preference never leaves your device and is never sent to the developer or any third party. The add-on contains no analytics, no tracking, and makes no network requests.
```

---

## Notes to Reviewer

```
No account, login, or special setup is required to test this add-on.

What it does:
Toggles the browser's native input value suggestions (form autofill history dropdown) on or off for all sites by setting autocomplete="off" on text inputs and textareas. This is required because Firefox does not expose the browser.formfill.enable preference to regular extensions.

How to test:
1. Install the add-on.
2. Open any site with a text field (e.g. a search box or contact form).
3. Type a value and submit/leave the field so the browser records it, then focus the field again to see the native suggestions dropdown.
4. Click the toolbar icon and flip the toggle to Off — revisit/reload the page and confirm the suggestions dropdown no longer appears.
5. Flip back to On and confirm suggestions return.
6. Switch tabs/reload to confirm the setting persists and applies to all open tabs.

Permissions explained:
- storage: saves the single on/off preference.
- <all_urls> / content script on all sites: needed to apply autocomplete="off" to input fields on every website.

Build instructions:
The .xpi is a plain ZIP with manifest.json at its root. It can be reproduced from source with: python build.py  (Requires Python 3; produces dist/input-suggestions-toggle-1.0.0.xpi).
```

---

## Version Notes (next step)

```
v1.0.0 — Initial release.

- One-click on/off toggle for native input value suggestions (form autofill history).
- Applies to all sites, frames, and shadow DOM; restores original autocomplete values on re-enable.
- Preference persists and syncs across open tabs.
- No data collection, no tracking, no network requests.
```
