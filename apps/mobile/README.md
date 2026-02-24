# ESN Mobile App

This directory contains the code for the ESN mobile application built with Expo/React Native.  The mobile app enables residents and field crews to report environmental hazards, capture photos, and track the status of their submissions.

## Structure

* `src/` – React Native components, hooks, and utilities.
* `assets/` – Icons, images, and fonts used in the app.
* `tests/` – Unit tests for components and hooks.
* `package.json` – NPM configuration and dependencies.
* `app.json` – Expo project configuration.

## Development

To run the app in development mode:

```bash
cd apps/mobile
yarn install
npx expo start
```

This will open the Expo Developer Tools.  You can run the app on an iOS simulator, Android emulator, or a physical device using the Expo Go app.

For design guidelines and user flows, see `docs/02-product/ui-ux-principles.md` and the hazard reporting schema in `data/schemas/hazard-report.schema.json`.