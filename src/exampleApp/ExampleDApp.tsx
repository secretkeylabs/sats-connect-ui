import {
  close,
  loadSelector,
  selectWalletProvider,
  walletOpen,
} from "../lib/utils";

import {
  mockAllInstalled,
  mockNoneInstalled,
  mockSomeUninstalled,
} from "./mocks";

loadSelector();

function handleButtonClickNoneInstalled() {
  selectWalletProvider(mockNoneInstalled()).then(() => {
    // nothing
  });
}

function handleButtonClickSomeInstalled() {
  selectWalletProvider(mockSomeUninstalled()).then((wallet) => {
    console.log("Selected wallet:", wallet);
    walletOpen(wallet);
    // Simulate user interacting with the wallet.
    setTimeout(close, 5000);
  });
}

function handleButtonClickAllInstalled() {
  selectWalletProvider(mockAllInstalled()).then((wallet) => {
    console.log("Selected wallet:", wallet);
    walletOpen(wallet);
    // Simulate user interacting with the wallet.
    setTimeout(close, 5000);
  });
}

export function ExampleDApp() {
  return (
    <div>
      <h1>This is a mock DApp</h1>
      <h2>Used to experiment with the wallet selector</h2>
      <p>Click the button below to see the selector</p>

      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          "align-items": "start",
          gap: "1rem",
        }}
      >
        <button
          style={{ display: "block" }}
          onClick={handleButtonClickNoneInstalled}
        >
          Open wallet selector (none installed)
        </button>
        <button
          style={{ display: "block" }}
          onClick={handleButtonClickSomeInstalled}
        >
          Open wallet selector (some installed)
        </button>
        <button
          style={{ display: "block" }}
          onClick={handleButtonClickAllInstalled}
        >
          Open wallet selector (all installed)
        </button>
      </div>
    </div>
  );
}
