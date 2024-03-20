# Wallet Selector Example App

To get started, run

```bash
npm install
npm run dev
```

This will run an example app using the selector which can be used during development.

# Viewing live

The example app using the wallet selector is available at <https://sats-connect-ui.netlify.app>.

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
