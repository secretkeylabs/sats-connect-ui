import { SupportedWallet } from "@sats-connect/core";

export type TRightPanelExplainer = { type: "explainer" };
export type TRightPanelInstallWalletPrompt = {
  type: "install-wallet-prompt";
  provider: SupportedWallet;
};
export type TRightPanelNone = { type: "none" };
export type TRightPanelOpeningWallet = {
  type: "opening-wallet";
  provider: SupportedWallet;
};
export type TRightPanelDisplay =
  | TRightPanelExplainer
  | TRightPanelInstallWalletPrompt
  | TRightPanelNone
  | TRightPanelOpeningWallet;
