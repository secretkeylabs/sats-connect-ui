# Wallet Selector Example App

To get started, run

```bash
bun install
bun dev
```

This will run an example app using the selector which can be used during development.

# Viewing live

The example app using the wallet selector is available at <https://sats-connect-ui.netlify.app>.

# Building the `@sats-connect/ui` package

To build the `@sats-connect/ui` package, run

```bash
bun build
```

# Building the example app

To build the example app use

```bash
bun build-app
```

# Arch

- Using bun
- Using Solid.js: no runtime, compiler
  - [Web component buider](https://github.com/solidjs/solid/tree/main/packages/solid-element#readme) (preserves reactivity)
- Styles inline b/c no style frameworks work to build custom elements
  - [CSS reset](https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css) adapted with [`:host` as suggested here](https://www.colorglare.com/css-resets-and-global-styles-in-web-components-c71fcea86dbd).
  - No portals, or styles break
- Ark UI: headless components

# API

- Event handlers / event emitters
