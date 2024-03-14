import { onMount } from "solid-js";

import { init } from "./lib";
import { selectWallet } from "./mockSatsConnectExports";

function handleButtonClick() {
  selectWallet()
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
  onMount(() => {
    init();
  });

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
