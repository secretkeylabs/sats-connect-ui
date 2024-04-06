import { SupportedWallet } from "@sats-connect/core";

export function openAppStore(provider: SupportedWallet) {
  window.open(provider.chromeWebStoreUrl, "_blank");
}
