import { Dialog } from "@ark-ui/solid";
import { For, type JSX, createSignal, onCleanup, onMount } from "solid-js";

import { getAvailableWallets } from "../mockSatsConnectExports";

import { CssReset } from "./CssReset";
import { WalletOption } from "./WalletOption";

export function WalletSelector() {
  const [isOpen, setIsOpen] = createSignal(false);
  function handleWalletSelected(wallet: string) {
    const event = new CustomEvent("sats-connect_wallet-selector_select", {
      detail: wallet,
      bubbles: true,
      composed: true,
    });
    window.dispatchEvent(event);
    setIsOpen(false);
  }

  const handleCancelClick: JSX.EventHandler<
    HTMLButtonElement,
    MouseEvent
  > = () => {
    const event = new CustomEvent("sats-connect_wallet-selector_cancel", {
      bubbles: true,
      composed: true,
    });
    window.dispatchEvent(event);
    setIsOpen(false);
  };

  onMount(() => {
    console.log("onMount");
  });

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  onMount(() => {
    window.addEventListener("sats-connect_wallet-selector_open", handleOpen);
    window.addEventListener("sats-connect_wallet-selector_close", handleClose);
  });

  onCleanup(() => {
    window.removeEventListener("sats-connect_wallet-selector_open", handleOpen);
    window.removeEventListener(
      "sats-connect_wallet-selector_close",
      handleClose,
    );
  });

  return (
    <div
      style={{
        position: isOpen() ? "fixed" : "static",
        inset: "0",
      }}
    >
      <CssReset />
      <Dialog.Root
        open={isOpen()}
        onOpenChange={(detail) => setIsOpen(detail.open)}
      >
        <Dialog.Backdrop
          style={{
            "background-color": "#FFFFFF80",
            position: "absolute",
            inset: "0",
            "backdrop-filter": "blur(10px)",
          }}
        />
        <Dialog.Positioner
          style={{
            position: "absolute",
            inset: "0",
            display: "flex",
            "align-items": "center",
            "justify-content": "center",
          }}
        >
          <Dialog.Content
            style={{
              border: "1px solid #000000", // For dev only so I can see the dialog
              "border-radius": "16px",
              "max-width": "424px",
              padding: "24px",
              "background-color": "#FFFFFF",
            }}
          >
            <Dialog.Title
              style={{
                "font-weight": "700",
                "font-size": "18px",
                margin: "0",
                "padding-bottom": "16px",
              }}
            >
              Choose wallet to connect
            </Dialog.Title>
            <Dialog.Description
              style={{
                "font-weight": "400",
                "font-size": "14px",
                "padding-bottom": "40px",
              }}
            >
              Start by selecting with one of the wallets below and confirming
              the connection.
            </Dialog.Description>
            <div
              style={{
                display: "grid",
                "grid-template-columns": "repeat(3, 1fr)",
              }}
            >
              <For each={getAvailableWallets()}>
                {(wallet) => (
                  <WalletOption
                    onWalletSelected={handleWalletSelected}
                    name={wallet.name}
                    icon={wallet.icon}
                  />
                )}
              </For>
            </div>
            <button onClick={handleCancelClick}>Cancel</button>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </div>
  );
}
