import { TWalletProviderOption } from "../utils";

export type TSidePanelExplainer = { type: "explainer" };
export type TSidePanelInstallWalletPrompt = {
  type: "install-wallet-prompt";
  option: TWalletProviderOption;
};
export type TSidePanelNone = { type: "none" };
export type TSidePanelOpeningWallet = {
  type: "opening-wallet";
  option: TWalletProviderOption;
};
export type TSidePanelDisplay =
  | TSidePanelExplainer
  | TSidePanelInstallWalletPrompt
  | TSidePanelNone
  | TSidePanelOpeningWallet;
