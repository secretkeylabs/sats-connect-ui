export {};

// Allow adding custom event listeners to the window object.
declare global {
  interface WindowEventMap {
    "sats-connect_wallet-selector_select": CustomEvent<string>;
    "sats-connect_wallet-selector_cancel": CustomEvent;
    "sats-connect_wallet-selector_open": CustomEvent;
    "sats-connect_wallet-selector_close": CustomEvent;
  }
}
