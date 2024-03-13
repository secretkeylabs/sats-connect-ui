import { registerWalletSelector } from "./Selector";

const exampleSatsConnectExports = {
  selectWallet: async () => {
    const selectorId = "sats-connect-wallet-selector";

    if (document.getElementById(selectorId)) {
      console.warn(
        "[sats-connect]: Wallet selection request already in progress, ignoring new request.",
      );
      return;
    }

    registerWalletSelector();
    const walletSelectorElement = document.createElement("wallet-selector");
    walletSelectorElement.id = selectorId;
    document.body.appendChild(walletSelectorElement);

    return new Promise((resolve, reject) => {
      function cleanup() {
        walletSelectorElement.removeEventListener(
          "sats-connect_wallet-selector_select",
          handleWalletSelectorSelectEvent,
        );
        walletSelectorElement.removeEventListener(
          "sats-connect_wallet-selector_cancel",
          handleWalletSelectorCancelEvent,
        );
        document.removeEventListener("keydown", handleEscKeypress);
        document.body.removeChild(walletSelectorElement);
      }

      function handleWalletSelectorSelectEvent(event: CustomEvent) {
        resolve(event.detail);
        cleanup();
      }

      function handleWalletSelectorCancelEvent() {
        reject();
        cleanup();
      }

      function handleEscKeypress(event: KeyboardEvent) {
        if (event.key === "Escape") {
          reject();
          cleanup();
        }
      }

      walletSelectorElement.addEventListener(
        "sats-connect_wallet-selector_select",
        handleWalletSelectorSelectEvent,
      );

      walletSelectorElement.addEventListener(
        "sats-connect_wallet-selector_cancel",
        handleWalletSelectorCancelEvent,
      );

      document.addEventListener("keydown", handleEscKeypress);
    });
  },
};

function handleButtonClick() {
  exampleSatsConnectExports.selectWallet().then(
    (wallet) => {
      console.log("Wallet selected", wallet);
    },
    () => {
      console.log("Wallet selection cancelled");
    },
  );
}

export function DApp() {
  return (
    <div>
      <h1>This is the DApp</h1>
      <h2>It's a work in progress</h2>

      <p>Check out some stuff</p>

      <p>Check out some more stuff</p>

      <div>
        <button onClick={handleButtonClick}>Open wallet selector</button>
      </div>
    </div>
  );
}
