import { registerWalletSelector, selectWalletProvider } from "./lib/utils";
import { mockGetAvailableProviders } from "./mocks";

registerWalletSelector();

function handleButtonClick() {
  selectWalletProvider(mockGetAvailableProviders())
    .then(
      (wallet) => {
        console.log("Wallet selected", wallet);
      },
      () => {
        console.log("Wallet selection cancelled");
      },
    )
    .catch((error) => {
      console.error("Wallet selection failed", error);
    });
}

export function ExampleDApp() {
  return (
    <div>
      <h1>This is a mock DApp</h1>
      <h2>Used to experiment with the wallet selector</h2>
      <p>Click the button below to see the selector</p>

      <div>
        <button onClick={handleButtonClick}>Open wallet selector</button>
      </div>
    </div>
  );
}
