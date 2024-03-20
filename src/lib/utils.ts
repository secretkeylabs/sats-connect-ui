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

export interface InstallPrompt {
  url: string;
}

export interface ProviderOption {
  name: string;
  id: string;
  icon: string;
  installPrompt?: InstallPrompt;
}

export function selectProvider(
  providers: Array<ProviderOption>,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const walletSelectorElement = getWalletSelectorElement();
    if (!walletSelectorElement) {
      reject(
        "Failed to detect the wallet selector, aborting wallet selection.",
      );
      return;
    }

    function cleanup() {
      window.removeEventListener(
        "sats-connect_wallet-selector_select",
        handleWalletSelectorSelectEvent,
      );

      window.removeEventListener(
        "sats-connect_wallet-selector_cancel",
        handleWalletSelectorCancelEvent,
      );
    }

    function handleWalletSelectorSelectEvent(event: CustomEvent<string>) {
      resolve(event.detail);
      cleanup();
    }

    function handleWalletSelectorCancelEvent() {
      reject();
      cleanup();
    }

    window.addEventListener(
      "sats-connect_wallet-selector_select",
      handleWalletSelectorSelectEvent,
    );

    window.addEventListener(
      "sats-connect_wallet-selector_cancel",
      handleWalletSelectorCancelEvent,
    );

    const event = new CustomEvent("sats-connect_wallet-selector_open", {
      detail: providers,
    });
    window.dispatchEvent(event);
  });
}
