# GitHub New Release — fill-in values

## Choose a tag

Create new tag: `v1.0.1` on publish (target branch: `main`)

## Release title

Firefox Input Suggestions Toggle v1.0.1

## Release description

<!-- Copy everything below into the GitHub "Release description" box -->

## Highlights

Turn the browser's input value suggestions (form autofill history) on or off for every website with a single click. This release refreshes the add-on icons with custom artwork.

## Features

- One-click toolbar toggle for input value suggestions
- Works across all sites, iframes, and shadow DOM
- Restores each field's original `autocomplete` value when re-enabled
- Setting saved and synced live to all open tabs

## Install

1. Download `input-suggestions-toggle-1.0.1.xpi` below.
2. Go to Add-ons: open `about:preferences`.
3. Click the cog/gear icon.
4. In the dropdown, click **Install Add-on From File**.
5. Select the `.xpi`.

## Compatibility

- Firefox 142+ / Waterfox

## Notes

- Uses `autocomplete="off"` on form fields because Firefox/Waterfox does not expose `browser.formfill.enable` to regular extensions.
- Does not affect password-manager (login) filling.

## Changelog

- **v1.0.1** — Updated add-on icons (custom artwork) and added a 64px icon variant.
- **v1.0.0** — Initial release.

<!-- End of release description -->

## Release label

None

## Pre-release

Leave unchecked (this is production ready)

## Attach binaries

`dist/input-suggestions-toggle-1.0.1.xpi`
