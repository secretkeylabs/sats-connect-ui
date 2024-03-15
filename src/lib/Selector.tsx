import { Dialog } from "@ark-ui/solid";
import {
  For,
  type JSX,
  Show,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";

import { getAvailableWallets } from "../mockSatsConnectExports";

import { CssReset } from "./CssReset";
import { WalletOption } from "./WalletOption";
import { XCircle } from "./XCircle";

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

  function handleCancelClick() {
    const event = new CustomEvent("sats-connect_wallet-selector_cancel", {
      bubbles: true,
      composed: true,
    });
    window.dispatchEvent(event);
    setIsOpen(false);
  }

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

  const [isVisible, setIsVisible] = createSignal(true);
  const [shouldRender, setShouldRender] = createSignal(true);

  const triggerFadeOut = () => setIsVisible(false);

  const handleAnimationEnd = () => {
    if (!isVisible()) {
      setShouldRender(false);
    }
  };

  return (
    <div
      style={{
        position: isOpen() ? "fixed" : "static",
        inset: "0",
      }}
    >
      <CssReset />
      <style>{`
        @keyframes wallet-selector-fade-in {
          from {opacity: 0; transform: translateY(40px);}
          to {opacity: 1; transform: translateY(0);}
        }

        @keyframes wallet-selector-fade-out {
          from {opacity: 1;}
          to {opacity: 0;}
        }
        @keyframes wallet-selector-blur-in {
          from {opacity: 0; backdrop-filter: blur(0px);}
          to {opacity: 1; backdrop-filter: blur(10px);}
        }

        @keyframes wallet-selector-blur-out {
          from {opacity: 1;}
          to {opacity: 0;}
        }
      `}</style>
      <Show when={shouldRender()}>
        <Dialog.Root
          open={isOpen()}
          onOpenChange={(detail) => setIsOpen(detail.open)}
        >
          <Dialog.Backdrop
            style={{
              "background-color": "#FFFFFF80",
              position: "absolute",
              inset: "0",
              animation: isOpen()
                ? "wallet-selector-blur-in 0.2s cubic-bezier(.05, .7, .1, 1) forwards"
                : "none",
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
                position: "relative", // For the close button
                "border-radius": "16px",
                "max-width": "424px",
                "max-height": "calc(100% - 128px)",
                padding: "24px",
                "background-color": "#FFFFFF",
                display: isOpen() ? "flex" : "none",
                "flex-direction": "column",
                "box-shadow": "0px 8px 16px #0000000f , 0px 0px 1px #00000031",
                animation: isOpen()
                  ? "wallet-selector-fade-in 0.4s cubic-bezier(.05, .7, .1, 1) forwards"
                  : "wallet-selector-fade-out",
              }}
              onAnimationEnd={handleAnimationEnd}
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
                  "padding-bottom": "30px",
                }}
              >
                Start by selecting with one of the wallets below and confirming
                the connection.
              </Dialog.Description>
              <div
                style={{
                  "flex-grow": "1",
                  "min-height": "0",
                  "overflow-y": "auto",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    "grid-template-columns": "repeat(3, 1fr)",
                    "column-gap": "8px",
                    "row-gap": "14px",
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
              </div>

              <div
                role="button"
                tabIndex={0}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                  margin: "0",
                }}
                onClick={handleCancelClick}
              >
                <XCircle />
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      </Show>
    </div>
  );
}
