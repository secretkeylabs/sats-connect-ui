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
