# Wallet provider option click behavior

The click behavior of a provider option depends on whether the provider is installed as well as whether there's enough space in the UI to show a side panel.

When an option contains the `installPrompt` property, the provider it represents is considered to not be installed. When absent, the provider is considered to be installed.

The side panel is an informational area of the selector which is shown when there's enough space for it in the UI.

The user flow when clicking uninstalled providers is a two step process if there's enough space for the side panel,

1. Clicking the provider option opens the side panel.
2. Clicking the side panel action takes the user to the app store.

and a one step process if there is no space for the panel,

1. Clicking the provider option takes the user to the app store.

A special case is when all provider options represent uninstalled providers: no side panel is ever shown, regardless of available UI space, and clicking the provider option takes the user to the app store.

Clicking on an installed provider returns the selection to the caller.

## Technical details

An `isShowingSidePanel()` helper is used to check whether there's a side panel in the DOM and its display style. This function is how UI layout requirements are tied to the option click behavior.
