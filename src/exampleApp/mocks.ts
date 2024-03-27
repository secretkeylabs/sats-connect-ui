import { Config } from "../lib";

export function mockNoneInstalled(): Config {
  return {
    providers: [
      {
        name: "Wallet (uninstalled)",
        id: "wallet-1",
        icon: "https://picsum.photos/101",
        isInstalled: false,
        chromeWebStoreUrl: "https://example.com/?chrome-store-wallet-1",
        googlePlayStoreUrl: "https://example.com/?google-play-wallet-1",
        iOSAppStoreUrl: "https://example.com/?ios-wallet-1",
      },
      {
        name: "Wallet (installed)",
        id: "wallet-2",
        icon: "https://picsum.photos/102",
        isInstalled: false,
        chromeWebStoreUrl: "https://example.com/?chrome-store-wallet-2",
        googlePlayStoreUrl: "https://example.com/?google-play-wallet-2",
        iOSAppStoreUrl: "https://example.com/?ios-wallet-2",
      },
    ],
  };
}

export function mockSomeUninstalled(): Config {
  return {
    providers: [
      {
        name: "Wallet (installed)",
        id: "wallet-1",
        icon: "https://picsum.photos/101",
        isInstalled: true,
        chromeWebStoreUrl: "https://example.com/?chrome-store-wallet-1",
        googlePlayStoreUrl: "https://example.com/?google-play-wallet-1",
        iOSAppStoreUrl: "https://example.com/?ios-wallet-1",
      },
      {
        name: "Wallet (uninstalled)",
        id: "wallet-2",
        icon: "https://picsum.photos/102",
        isInstalled: false,
        chromeWebStoreUrl: "https://example.com/?chrome-store-wallet-2",
        googlePlayStoreUrl: "https://example.com/?google-play-wallet-2",
        iOSAppStoreUrl: "https://example.com/?ios-wallet-2",
      },
    ],
  };
}

export function mockAllInstalled(): Config {
  return {
    providers: [
      {
        name: "Wallet (installed)",
        id: "wallet-1",
        icon: "https://picsum.photos/101",
        isInstalled: true,
        chromeWebStoreUrl: "https://example.com/?chrome-store-wallet-1",
        googlePlayStoreUrl: "https://example.com/?google-play-wallet-1",
        iOSAppStoreUrl: "https://example.com/?ios-wallet-1",
      },
      {
        name: "Wallet (installed)",
        id: "wallet-2",
        icon: "https://picsum.photos/102",
        isInstalled: true,
        chromeWebStoreUrl: "https://example.com/?chrome-store-wallet-2",
        googlePlayStoreUrl: "https://example.com/?google-play-wallet-2",
        iOSAppStoreUrl: "https://example.com/?ios-wallet-2",
      },
    ],
  };
}
