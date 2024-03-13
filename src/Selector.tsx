import { customElement } from "solid-element";
import type { JSX } from "solid-js";

export function WalletSelector() {
  const handleWalletClick: JSX.BoundEventHandler<
    HTMLButtonElement,
    MouseEvent
  >[0] = (wallet, e) => {
    // Emit custom wallet selection event
    const event = new CustomEvent("sats-connect_wallet-selector_select", {
      detail: wallet,
      bubbles: true,
      composed: true,
    });
    e.target.dispatchEvent(event);
  };

  const handleCancelClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (
    e,
  ) => {
    // Emit custom cancel event
    const event = new CustomEvent("sats-connect_wallet-selector_cancel", {
      bubbles: true,
      composed: true,
    });
    e.target.dispatchEvent(event);
  };
  return (
    <div>
      <h1>This is the selector</h1>
      <ul>
        <li>
          <button onClick={[handleWalletClick, "xverse"]}>Xverse</button>
        </li>
        <li>
          <button onClick={[handleWalletClick, "leather"]}>Leather</button>
        </li>
        <li>
          <button onClick={[handleWalletClick, "unisat"]}>Unisat</button>
        </li>
      </ul>

      <button onClick={handleCancelClick}>Cancel</button>
    </div>
  );
}

export function registerWalletSelector() {
  customElement("wallet-selector", WalletSelector);
}
