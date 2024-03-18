import { getWalletSelectorElement } from "./lib";

export const formatConsoleMessage = (message: string) => {
  return `[sats-connect]: ${message}`;
};

export const selectWallet = () => {
  return new Promise((resolve, reject) => {
    const walletSelectorElement = getWalletSelectorElement();
    if (!walletSelectorElement) {
      console.error(
        formatConsoleMessage(
          "Failed to detect the wallet selector, aborting wallet selection.",
        ),
      );
      reject();
      return;
    }

    function cleanup() {
      // Remove all event listeners
      window.removeEventListener(
        "sats-connect_wallet-selector_select",
        handleWalletSelectorSelectEvent,
      );

      window.removeEventListener(
        "sats-connect_wallet-selector_cancel",
        handleWalletSelectorCancelEvent,
      );

      window.removeEventListener("keydown", handleEscKeypress);
    }

    function handleWalletSelectorSelectEvent(event: CustomEvent<string>) {
      resolve(event.detail);
      cleanup();
    }

    function handleWalletSelectorCancelEvent() {
      reject();
      cleanup();
    }

    function handleEscKeypress(event: KeyboardEvent) {
      if (event.key === "Escape") {
        const event = new CustomEvent("sats-connect_wallet-selector_close");
        window.dispatchEvent(event);
        reject();
        cleanup();
      }
    }

    window.addEventListener(
      "sats-connect_wallet-selector_select",
      handleWalletSelectorSelectEvent,
    );

    window.addEventListener(
      "sats-connect_wallet-selector_cancel",
      handleWalletSelectorCancelEvent,
    );

    window.addEventListener("keydown", handleEscKeypress);

    const event = new CustomEvent("sats-connect_wallet-selector_open");
    window.dispatchEvent(event);
  });
};

export function getAvailableWallets(): Array<{ name: string; icon: string }> {
  return [
    { name: "Wallet 1", icon: "https://picsum.photos/100" },
    { name: "Wallet 2", icon: "https://picsum.photos/101" },
    { name: "Wallet 3", icon: "https://picsum.photos/102" },
    { name: "Wallet 4", icon: "https://picsum.photos/103" },
    { name: "Wallet 5", icon: "https://picsum.photos/104" },
    { name: "Wallet 6", icon: "https://picsum.photos/105" },
    { name: "Wallet 7", icon: "https://picsum.photos/106" },
    { name: "Wallet 8", icon: "https://picsum.photos/107" },
    { name: "Wallet 9", icon: "https://picsum.photos/108" },
    { name: "Wallet 10", icon: "https://picsum.photos/109" },
    { name: "Wallet 11", icon: "https://picsum.photos/110" },
    { name: "Wallet 12", icon: "https://picsum.photos/111" },
    { name: "Wallet 13", icon: "https://picsum.photos/112" },
    { name: "Wallet 14", icon: "https://picsum.photos/113" },
    { name: "Wallet 15", icon: "https://picsum.photos/114" },
    { name: "Wallet 16", icon: "https://picsum.photos/115" },
    { name: "Wallet 17", icon: "https://picsum.photos/116" },
    { name: "Wallet 18", icon: "https://picsum.photos/117" },
    { name: "Wallet 19", icon: "https://picsum.photos/118" },
    { name: "Wallet 20", icon: "https://picsum.photos/119" },
  ];
}
