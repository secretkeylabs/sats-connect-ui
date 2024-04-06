import { customElement } from "solid-element";

import { WalletProviderSelector } from "./WalletProviderSelector";
import {
  cancel,
  close as closeEventName,
  open,
  select,
  walletClose as walletCloseEventName,
  walletOpen as walletOpenEventName,
} from "./constants";

export const elementId = "sats-connect-wallet-provider-selector";
export const elementName = elementId;

export function getWalletProviderSelectorElement() {
  return document.getElementById(elementId);
}

/**
 * Call this once in your app. It registers the selector's custom element
 * definition and adds it to the `<body>`.
 */
export function loadSelector() {
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

export interface InstallPrompt {
  url: string;
}

export interface TWalletProviderOption {
  name: string;
  id: string;
  icon: string;
  installPrompt?: InstallPrompt;
}

export function hasInstallPrompt(option: TWalletProviderOption): boolean {
  return !!option.installPrompt;
}

export function isInstalled(option: TWalletProviderOption): boolean {
  return !hasInstallPrompt(option);
}

export type Config = { options: Array<TWalletProviderOption> };

export function selectWalletProvider(config: Config): Promise<string> {
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
      detail: config,
    });
    window.dispatchEvent(event);
  });
}

export function walletOpen(wallet: string) {
  const event = new CustomEvent(walletOpenEventName, {
    detail: wallet,
  });
  window.dispatchEvent(event);
}

export function walletClose() {
  const event = new CustomEvent(walletCloseEventName);
  window.dispatchEvent(event);
}

export function close() {
  const event = new CustomEvent(closeEventName);
  window.dispatchEvent(event);
}
