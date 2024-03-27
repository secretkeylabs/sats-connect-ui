import { Config } from "./utils";

export const select = "sats-connect_wallet-provider-selector_select";
export const cancel = "sats-connect_wallet-provider-selector_cancel";
export const open = "sats-connect_wallet-provider-selector_open";
export const close = "sats-connect_wallet-provider-selector_close";
export const walletOpen = "sats-connect_wallet-provider-selector_walletOpen";
export const walletClose = "sats-connect_wallet-provider-selector_walletClose";

// Allow adding custom event listeners to the window object.
declare global {
  interface WindowEventMap {
    "sats-connect_wallet-provider-selector_select": CustomEvent<string>;
    "sats-connect_wallet-provider-selector_cancel": CustomEvent;
    "sats-connect_wallet-provider-selector_open": CustomEvent<Config>;
    "sats-connect_wallet-provider-selector_close": CustomEvent;
    "sats-connect_wallet-provider-selector_walletOpen": CustomEvent<string>;
    "sats-connect_wallet-provider-selector_walletClose": CustomEvent;
  }
}
