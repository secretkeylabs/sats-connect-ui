import { ProviderOption } from "./lib";

export function mockGetAvailableProviders(): Array<ProviderOption> {
  return [
    {
      name: "Walet (uninstalled)",
      id: "xverse",
      icon: "https://picsum.photos/100",
      installPrompt: { url: "https://xverse.app" },
    },
    { name: "Wallet 2", id: "Wallet_2", icon: "https://picsum.photos/101" },
    { name: "Wallet 3", id: "Wallet_3", icon: "https://picsum.photos/102" },
    { name: "Wallet 4", id: "Wallet_4", icon: "https://picsum.photos/103" },
    {
      name: "Wallet 5 with super long name",
      id: "Wallet_5",
      icon: "https://picsum.photos/104",
    },
    { name: "Wallet 6", id: "Wallet_6", icon: "https://picsum.photos/105" },
    { name: "Wallet 7", id: "Wallet_7", icon: "https://picsum.photos/106" },
    { name: "Wallet 8", id: "Wallet_8", icon: "https://picsum.photos/107" },
    { name: "Wallet 9", id: "Wallet_9", icon: "https://picsum.photos/108" },
    { name: "Wallet 10", id: "Wallet_10", icon: "https://picsum.photos/109" },
    { name: "Wallet 11", id: "Wallet_11", icon: "https://picsum.photos/110" },
    { name: "Wallet 12", id: "Wallet_12", icon: "https://picsum.photos/111" },
    { name: "Wallet 13", id: "Wallet_13", icon: "https://picsum.photos/112" },
    { name: "Wallet 14", id: "Wallet_14", icon: "https://picsum.photos/113" },
    { name: "Wallet 15", id: "Wallet_15", icon: "https://picsum.photos/114" },
    { name: "Wallet 16", id: "Wallet_16", icon: "https://picsum.photos/115" },
    { name: "Wallet 17", id: "Wallet_17", icon: "https://picsum.photos/116" },
    { name: "Wallet 18", id: "Wallet_18", icon: "https://picsum.photos/117" },
    { name: "Wallet 19", id: "Wallet_19", icon: "https://picsum.photos/118" },
    { name: "Wallet 20", id: "Wallet_20", icon: "https://picsum.photos/119" },
  ];
}
