# Selector API

Interaction with the selector is done by means of custom events. The selector sets up event listeners when it mounts, and convenience methods are available to interact with the selector.

For consistency and practicality, all the events are emitted to and listened from `window`.

## Loading the selector

Before use, the selector needs to be registered as a custom element and insterted into the DOM. The `loadSelector()` helper function facilitates both these actions, ensuring the selector is properly registered and added to the page.

## Events API

Events are used to interact with the selector.

### Listeners

- **open** `"sats-connect_wallet-provider-selector_open"`: The selector will open and display the providers as configured using custom event's `details` property, which is expected to be of type [`Config`](../src/lib/utils.ts)
- **close** `"sats-connect_wallet-provider-selector_close"`: The selector will close if open.

### Emitted events

- **select**: `"sats-connect_wallet-provider-selector_select"`: Emitted when the user selects a provider. The selected provider ID is in the custom event's `details` property.
- **cancel** `"sats-connect_wallet-provider-selector_cancel"`: Emitted when the user closes the selector.

## Request flow

Below is how third party code would interact with the selector.

```mermaid
sequenceDiagram

    Third party code->>Window: Register "select" event handler.
    Third party code->>Window: Register "cancel" event handler.
    Third party code->>Window: Emit "open" event.<br/>Event payload contains config.<br/>Config contains list of wallet providers.
    Window ->> Selector: Trigger "open" handler.
    Selector ->> Selector: Process user interaction.
    alt User makes selection
        Selector->>Window: Emit "select" event.<br/>Event payload contains provider ID.
        Window ->>Third party code: Trigger "select" handler.
    else Users cancels
        Selector->>Window: Emit "cancel" event.
        Window ->>Third party code: Trigger "cancel" handler.
    end
```

For convenience, the `selectWalletProvider()` method is provided to perform the flow above. It takes care of setting up the necessary event handlers, returns the result as a `Promise` and cleans up the event handlers when done.

## A note on Typescript

The event names used by the selector are defined in [`selector-events.ts`](../src/lib/selector-events.ts), which is necessary to satisfy the compiler.
