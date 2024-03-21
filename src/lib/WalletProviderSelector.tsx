import { Dialog } from "@ark-ui/solid";
import { For, Show, batch, createSignal, onCleanup, onMount } from "solid-js";

import { CssReset } from "./CssReset";
import { WalletProviderOption } from "./WalletProviderOption";
import { XCircle } from "./XCircle";
import { cancel, close, open, select } from "./constants";
import { ProviderOption } from "./utils";

export function WalletProviderSelector() {
  const [isVisible, setIsVisible] = createSignal(false);
  const [shouldRender, setShouldRender] = createSignal(false);
  const [providers, setProviders] = createSignal<Array<ProviderOption>>([]);

  const triggerFadeOut = () => setIsVisible(false);

  function handleCancelClick() {
    const event = new CustomEvent(cancel, {
      bubbles: true,
      composed: true,
    });
    window.dispatchEvent(event);
    triggerFadeOut();
  }

  function handleWalletSelected(walletId: string) {
    const event = new CustomEvent(select, {
      detail: walletId,
      bubbles: true,
      composed: true,
    });
    window.dispatchEvent(event);
    batch(() => {
      setIsVisible(false);
      setShouldRender(false);
    });
  }

  function handleOpen(e: CustomEvent<Array<ProviderOption>>) {
    batch(() => {
      setIsVisible(true);
      setShouldRender(true);
      setProviders(e.detail);
    });
  }

  function handleClose() {
    setIsVisible(false);
  }

  const handleAnimationEnd = () => {
    if (!isVisible()) {
      setShouldRender(false);
    }
  };

  onMount(() => {
    window.addEventListener(open, handleOpen);
    window.addEventListener(close, handleClose);

    // Adds the DM Sans font stylesheet into the document head. Seems fonts
    // can't (or are difficult) to load from the shadow DOM, yet globally
    // available fonts are usable within the shadow DOM.
    document.head.appendChild(
      (
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      ) as Node,
    );
  });

  function handleAsCancelled(e: Event) {
    e.preventDefault();
    handleCancelClick();
  }

  onCleanup(() => {
    window.removeEventListener(open, handleOpen);
    window.removeEventListener(
      "sats-connect_wallet-selector_close",
      handleClose,
    );
  });

  const [root, setRoot] = createSignal<HTMLDivElement>();
  return (
    <div
      ref={setRoot}
      style={{
        position: shouldRender() ? "fixed" : "static",
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
          from {opacity: 1; transform: translateY(0);}
          to {opacity: 0; transform: translateY(40px);}
        }
        @keyframes wallet-selector-blur-in {
          from {opacity: 0; backdrop-filter: blur(0px);}
          to {opacity: 1; backdrop-filter: blur(10px);}
        }

        @keyframes wallet-selector-blur-out {
          from {opacity: 1; backdrop-filter: blur(10px);}
          to {opacity: 0; backdrop-filter: blur(0px);}
        }
      `}</style>
      <Show when={shouldRender()}>
        <Dialog.Root
          getRootNode={() => root()?.getRootNode() as Node}
          open={shouldRender()}
          onEscapeKeyDown={handleAsCancelled}
          onInteractOutside={handleAsCancelled}
          onPointerDownOutside={handleAsCancelled}
        >
          <Dialog.Backdrop
            style={{
              "background-color": "#FFFFFF80",
              position: "absolute",
              inset: "0",
              animation: isVisible()
                ? "wallet-selector-blur-in 0.2s cubic-bezier(.05, .7, .1, 1) forwards"
                : "wallet-selector-blur-out 0.2s cubic-bezier(.3, 0, .8, .15) forwards",
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
                "background-color": "#FFFFFF",
                display: shouldRender() ? "flex" : "none",
                "flex-direction": "column",
                "box-shadow": "0px 8px 64px 0px rgba(0, 0, 0, 0.25)",
                animation: isVisible()
                  ? "wallet-selector-fade-in 0.4s cubic-bezier(.05, .7, .1, 1) forwards"
                  : "wallet-selector-fade-out 0.2s cubic-bezier(.3, 0, .8, .15) forwards",
              }}
              onAnimationEnd={handleAnimationEnd}
            >
              <Dialog.Title
                style={{
                  "font-weight": "700",
                  "font-size": "18px",
                  margin: "0",
                  "padding-top": "24px",
                  "padding-left": "24px",
                  "padding-right": "24px",
                  "padding-bottom": "16px",
                }}
              >
                Choose wallet to connect
              </Dialog.Title>
              <Dialog.Description
                style={{
                  "font-weight": "400",
                  "font-size": "14px",
                  "padding-left": "24px",
                  "padding-right": "24px",
                  "padding-bottom": "30px",
                }}
              >
                Start by selecting with one of the wallets below and confirming
                the connection.
              </Dialog.Description>
              <div
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "flex-grow": "1",
                  "min-height": "0",
                  "padding-left": "8px",
                  "padding-right": "8px",
                  "padding-bottom": "24px",
                }}
              >
                <div
                  style={{
                    "flex-grow": "1",
                    "min-height": "0",
                    "overflow-y": "auto",
                    "padding-left": "16px",
                    "padding-right": "16px",
                    display: "grid",
                    "grid-template-columns": "repeat(3, 1fr)",
                    "column-gap": "8px",
                    "row-gap": "6px",
                  }}
                >
                  <For each={providers()}>
                    {(provider) => (
                      <WalletProviderOption
                        {...provider}
                        onProviderSelected={handleWalletSelected}
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
