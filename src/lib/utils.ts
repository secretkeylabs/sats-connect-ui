import { customElement } from "solid-element";

import { WalletProviderSelector } from "./WalletProviderSelector";
import { cancel, open, select } from "./constants";

export const elementId = "sats-connect-wallet-provider-selector";
export const elementName = elementId;

export function getWalletProviderSelectorElement() {
  return document.getElementById(elementId);
}

/**
 * Call this once in your app to register the wallet provider selector element.
 */
export function registerWalletSelector() {
  if (customElements.get(elementName)) {
    return;
  }

  customElement(elementName, WalletProviderSelector);

  const element = document.createElement(elementName);
  element.id = elementId;
  document.body.appendChild(element);
}

export function cleanup() {
  const element = getWalletProviderSelectorElement();
  if (element) {
    element.remove();
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

export function selectWalletProvider(
  walletProviders: Array<ProviderOption>,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const walletSelectorElement = getWalletProviderSelectorElement();
    if (!walletSelectorElement) {
      reject("Failed to detect the wallet provider selector.");
      return;
    }

    function cleanup() {
      window.removeEventListener(select, handleWalletSelectorSelectEvent);

      window.removeEventListener(cancel, handleWalletSelectorCancelEvent);
    }

    function handleWalletSelectorSelectEvent(event: CustomEvent<string>) {
      resolve(event.detail);
      cleanup();
    }

    function handleWalletSelectorCancelEvent() {
      reject();
      cleanup();
    }

    window.addEventListener(select, handleWalletSelectorSelectEvent);

    window.addEventListener(cancel, handleWalletSelectorCancelEvent);

    const event = new CustomEvent(open, {
      detail: walletProviders,
    });
    window.dispatchEvent(event);
  });
}
