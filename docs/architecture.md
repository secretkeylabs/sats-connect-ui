# Architecture

The UI for the wallet provider selector is made available through a [custom element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements). Custom elements are easy to integrate in just about any web project. Methods detailed in [Selector API](./selector-api.md) are provided to interact with the selector.

## Reactivity

The selector uses [Solid](https://www.solidjs.com/) for component logic and reactivity. Solid has a build-time compiler and no runtime, ideal for creating performant and compact shareable components.

## Building the custom element

Solid, like other popular component frameworks, is usually used to manipulate the DOM. To encapsulate the selector's logic into a custom element, the [`solid-element`](https://github.com/solidjs/solid/tree/main/packages/solid-element#readme) package is used.

## Styles

Styles for the selector are in the form of inline styles or `<style>` tags in the source. There doesn't seem to be a better solution for managing styles when building a custom element.

Styling solutions usually have a tight integration with the build process and emit CSS assets or add code that inserts `<style>` tags into the `<header>`. In general, these approaches don't work with custom elements which are defined at run time: there's nothing to inject the styles into during the build process. Dedicated frameworks like Polymer and Stencil exist to overcome this issue, although they currently have fewer Github stars and seem to use more component complex abstractions.

The selector uses a [CSS reset](https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css) that has been [adapted for custom elements](https://www.colorglare.com/css-resets-and-global-styles-in-web-components-c71fcea86dbd). For convenience, all margins have also been removed using the reset.

Styles may break when using Portals. By default, they render elements directly into the body and outside of the influence of the styles defined within the custom element.

The `DM Sans` font used by the selector is added to the document's `<head>` in a `<link>` tag and referenced in the CSS reset. Global fonts can be referenced within custom elements, although importing a font within a custom element [doesn't seem to be working](https://stackoverflow.com/q/78204762/1494725).

## Components

The selector is built with [Ark UI](https://ark-ui.com/) components. They're headless components, meaning they're functional, yet carry no styles and can be styled as needed.
