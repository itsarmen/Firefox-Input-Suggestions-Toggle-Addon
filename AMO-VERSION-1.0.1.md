# AMO — Submit New Version 1.0.1

Copy/Paste cheat sheet for the "Submit a New Version" form on addons.mozilla.org.

---

## Release Notes

```
v1.0.1

- Updated add-on icons with custom artwork.
- Added a 64px icon variant.

No functional changes.
```

---

## Notes to Reviewer

```
Version 1.0.1 is an icon-only update. No functional changes.

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

No account, login, or special setup is required to test this add-on.

Build instructions:
The .xpi is a plain ZIP with manifest.json at its root. It can be reproduced from source with: python build.py  (Requires Python 3; produces dist/input-suggestions-toggle-1.0.1.xpi). No minification, bundling, transpiling, or code generation is used, so no separate source package is required.
```
