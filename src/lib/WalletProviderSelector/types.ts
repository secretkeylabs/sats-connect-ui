import { SupportedWallet } from "@sats-connect/core";

export type TSidePanelExplainer = { type: "explainer" };
export type TSidePanelInstallWalletPrompt = {
  type: "install-wallet-prompt";
  provider: SupportedWallet;
};
export type TSidePanelNone = { type: "none" };
export type TSidePanelOpeningWallet = {
  type: "opening-wallet";
  provider: SupportedWallet;
};
export type TSidePanelDisplay =
  | TSidePanelExplainer
  | TSidePanelInstallWalletPrompt
  | TSidePanelNone
  | TSidePanelOpeningWallet;
