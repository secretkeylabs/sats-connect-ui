import { Config } from "../lib";

export function mockNoneInstalled(): Config {
  return {
    options: [
      {
        name: "Wallet 1",
        id: "wallet-1",
        icon: "https://picsum.photos/101",
        installPrompt: {
          url: "https://example.com/?chrome-store-wallet-1",
        },
      },
      {
        name: "Wallet 2",
        id: "wallet-2",
        icon: "https://picsum.photos/102",
        installPrompt: {
          url: "https://example.com/?chrome-store-wallet-2",
        },
      },
    ],
  };
}

export function mockSomeUninstalled(): Config {
  return {
    options: [
      {
        name: "Wallet 1",
        id: "wallet-1",
        icon: "https://picsum.photos/101",
      },
      {
        name: "Wallet 2",
        id: "wallet-2",
        icon: "https://picsum.photos/102",
        installPrompt: {
          url: "https://example.com/?chrome-store-wallet-2",
        },
      },
    ],
  };
}

export function mockAllInstalled(): Config {
  return {
    options: [
      {
        name: "Wallet 1",
        id: "wallet-1",
        icon: "https://picsum.photos/101",
      },
      {
        name: "Wallet 2",
        id: "wallet-2",
        icon: "https://picsum.photos/102",
      },
    ],
  };
}

export function mockManySomeInstalled() {
  return {
    // 25 wallets
    options: Array.from({ length: 50 }, (_, i) => {
      const id = `wallet-${i + 1}`;
      return {
        name: `Wallet ${i + 1}`,
        id,
        icon: `https://picsum.photos/${i + 101}`,
        ...(i % 2 === 0 && {
          installPrompt: {
            url: `https://example.com/?chrome-store-${id}`,
          },
        }),
      };
    }),
  };
}
