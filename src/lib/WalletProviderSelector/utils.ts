import { SupportedWallet } from "@sats-connect/core";

export function openChromeWebStore(provider: SupportedWallet) {
  window.open(provider.chromeWebStoreUrl, "_blank");
}
