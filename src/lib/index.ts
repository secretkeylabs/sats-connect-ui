import { customElement } from "solid-element";

import { WalletSelector } from "./Selector";

export const selectorId = "sats-connect-wallet-selector";

export function getWalletSelectorElement() {
  return document.getElementById(selectorId);
}

export function registerWalletSelector() {
  customElement("wallet-selector", WalletSelector);

  const walletSelectorElement = document.createElement("wallet-selector");
  walletSelectorElement.id = selectorId;
  document.body.appendChild(walletSelectorElement);
}

export function cleanup() {
  const walletSelectorElement = getWalletSelectorElement();
  if (walletSelectorElement) {
    walletSelectorElement.remove();
  }
}
