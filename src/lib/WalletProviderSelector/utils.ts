import { TWalletProviderOption } from "../utils";

export function openAppStore(option: TWalletProviderOption) {
  const url = option.installPrompt?.url;

  if (!url) {
    console.error("No install prompt URL found for", option.id);
    return;
  }

  window.open(url, "_blank");
}
