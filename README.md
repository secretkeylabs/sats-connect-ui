# `@sats-connect/ui`

A Web3 wallet provider selector. Built as a custom element, compatible with all major UI frameworks.

## Basic usage

```ts
import { registerElement, selectWalletProvider } from "@sats-connect/ui";

// Call this only once in your app, loads the custom element.
registerElement();

// At a later point,
//
// 1. Decide which wallet providers should be displayed to the user.
// 2. Display the selector and capture the user's selection.

// (1)
const providersToDisplay = someBusinessLogic();
// (2)
const userSelectedProviderId = await selectWalletProvider();
```

# Development

An example app using the selector is included for convenience during development. To get started, run

```bash
npm install
npm run dev
```

# Building the `@sats-connect/ui` package

To build the `@sats-connect/ui` package, run

```bash
npm run build
```

# Building the example app

To build the example app use

```bash
npm run build-app
```

## Viewing the example app live

The latest version of the example app is available at <https://sats-connect-ui.netlify.app>.

# Arch

- Using Solid.js: no runtime, compiler
  - [Web component buider](https://github.com/solidjs/solid/tree/main/packages/solid-element#readme) (preserves reactivity)
- Styles inline b/c no style frameworks work to build custom elements
  - [CSS reset](https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css) adapted with [`:host` as suggested here](https://www.colorglare.com/css-resets-and-global-styles-in-web-components-c71fcea86dbd).
  - No portals, or styles break
  - Globally added `DM Sans` to reset as required by designs.
    - A `<link>` tag is added to document head on component mount.
- Ark UI: headless components

# API

- Event handlers / event emitters
