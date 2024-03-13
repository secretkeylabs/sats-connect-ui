export {};

declare global {
  interface HTMLElementEventMap {
    "sats-connect_wallet-selector_select": CustomEvent<string>;
    "sats-connect_wallet-selector_cancel": CustomEvent;
  }
}
