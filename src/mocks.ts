import { Config } from "./lib";

export function mockGetAvailableProviders(): Config {
  return {
    providers: [
      {
        name: "Wallet (uninstalled)",
        id: "xverse",
        icon: "https://picsum.photos/100",
        isInstalled: false,
        chromeWebStoreUrl: "https://example.com/?chrome-store-xverse-wallet",
        googlePlayStoreUrl: "https://example.com/?google-play-xverse-wallet",
        iOSAppStoreUrl: "https://example.com/?ios-xverse-wallet",
      },
      {
        name: "Wallet (installed)",
        id: "xverse",
        icon: "https://picsum.photos/101",
        isInstalled: true,
        chromeWebStoreUrl: "https://example.com/?chrome-store-xverse-wallet",
        googlePlayStoreUrl: "https://example.com/?google-play-xverse-wallet",
        iOSAppStoreUrl: "https://example.com/?ios-xverse-wallet",
      },
    ],
  };
}
