import { Dialog } from "@ark-ui/solid";
import { SupportedWallet } from "@sats-connect/core";
import {
  For,
  Match,
  Show,
  Switch,
  batch,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";

import {
  cancel,
  close,
  open,
  select,
  walletClose,
  walletOpen,
} from "../constants";
import { bodyTextStyles, titleTextStyles } from "../styles";
import { Config } from "../utils";

import { CloseButton } from "./components/CloseButton";
import { CssReset } from "./components/CssReset";
import { Divider } from "./components/Divider";
import { RightPanelContainer } from "./components/RightPanelContainer";
import { RightPanelContentContainer } from "./components/RightPanelContentContainer";
import { RightPanelExplainer } from "./components/RightPanelExplainer";
import { RightPanelInstallWalletPrompt } from "./components/RightPanelInstallWalletPrompt";
import { RightPanelOpeningWallet } from "./components/RightPanelOpeningWallet";
import { WalletProviderOption } from "./components/WalletProviderOption";
import { TRightPanelDisplay, TRightPanelInstallWalletPrompt } from "./types";
import { openChromeWebStore } from "./utils";

const cardRadius = "24px";

export function WalletProviderSelector() {
  const [isVisible, setIsVisible] = createSignal(false);
  const [shouldRender, setShouldRender] = createSignal(false);
  const [providers, setProviders] = createSignal<Array<SupportedWallet>>([]);
  const [rightPanelDisplay, setRightPanelDisplay] =
    createSignal<TRightPanelDisplay>({ type: "none" });

  const hasAnyWalletInstalled = () => providers().some((p) => p.isInstalled);

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
    const provider = providers().find(
      (p) => p.id === walletId,
    ) as SupportedWallet;

    if (!hasAnyWalletInstalled()) {
      openChromeWebStore(provider);
      return;
    }

    if (!provider.isInstalled) {
      setRightPanelDisplay({ type: "install-wallet-prompt", provider });
      return;
    }

    const event = new CustomEvent(select, {
      detail: walletId,
      bubbles: true,
      composed: true,
    });
    window.dispatchEvent(event);
  }

  function handleOpen(e: CustomEvent<Config>) {
    batch(() => {
      setIsVisible(true);
      setShouldRender(true);

      const providers = e.detail.providers;
      setProviders(providers);

      if (providers.some((p) => p.isInstalled)) {
        setRightPanelDisplay({ type: "explainer" });
      } else {
        setRightPanelDisplay({ type: "none" });
      }
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

  function handleWalletOpen(e: CustomEvent<string>) {
    const providerId = e.detail;
    setRightPanelDisplay({
      type: "opening-wallet",
      provider: providers().find((p) => p.id === providerId) as SupportedWallet,
    });
  }

  function handleWalletClose() {
    setRightPanelDisplay({ type: "explainer" });
  }

  onMount(() => {
    window.addEventListener(open, handleOpen);
    window.addEventListener(close, handleClose);
    window.addEventListener(walletOpen, handleWalletOpen);
    window.addEventListener(walletClose, handleWalletClose);

    // Adds the DM Sans font stylesheet into the document head. Fonts don't seem
    // to be picked up when imported from witin the shadow DOM, yet globally
    // available fonts are usable within the shadow DOM.
    //
    // See: https://stackoverflow.com/q/78204762/1494725
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
    window.removeEventListener(close, handleClose);
  });

  const [root, setRoot] = createSignal<HTMLDivElement>();
  const [rightPanel, setRightPanel] = createSignal<HTMLDivElement>();
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
      <style>
        {`
            .card-width-container {
              container: card-width-container / inline-size;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
              width: 740px;
            }

            .card-height-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-end;
              height: 100%;
              width: 100%;
            }

            .card {
              min-height: 340px;
              max-height: calc(100vh - 8rem);
              width: 100%;
              border-top-left-radius: ${cardRadius};
              border-top-right-radius: ${cardRadius};

              background: rgb(196, 177, 217);
              overflow: hidden;

              display: flex;
              flex-direction: column;

              position: "relative"; /* For the close button */
              background-color: #ffffff;
              display: ${shouldRender() ? "block" : "none"};

              box-shadow: 0px 8px 64px 0px rgba(0, 0, 0, 0.25);
              animation: ${
                isVisible()
                  ? "wallet-selector-fade-in 0.4s cubic-bezier(.05, .7, .1, 1) forwards"
                  : "wallet-selector-fade-out 0.2s cubic-bezier(.3, 0, .8, .15) forwards"
              };
            }

            .card-grid {
              flex-grow: 1;

              display: grid;
              height: 100%;
            }

            .left-panel {
              height: 100%;
              overflow: hidden;
              display: flex;
              flex-direction: column;
            }

            .wallets-grid-container {
              overflow: auto;
              flex-grow: 1;
            }

            .wallets-grid {

              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
              align-content: start;
            }

            .right-panel {
              display: none;
            }

            @container card-width-container (width > 400px) {
              .card-height-container {
                justify-content: center;
              }
  
              .card {
                max-width: calc(100vw - 2rem);
                max-height: 460px;
                ${hasAnyWalletInstalled() ? "" : "width: 360px;"}
                border-bottom-left-radius: ${cardRadius};
                border-bottom-right-radius: ${cardRadius};
              }
              .card-grid {
                grid-template-columns: ${
                  hasAnyWalletInstalled() ? "5fr auto 4fr" : "1fr"
                };
                grid-template-areas: ${
                  hasAnyWalletInstalled()
                    ? `"providers divider rightPanel"`
                    : `"providers"`
                };
              }

              .right-panel {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }
            }
          `}
      </style>
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
              display: "flex",
              "justify-content": "center",
              "align-items": "center",
              height: "100%",
            }}
          >
            <div class="card-width-container">
              <div class="card-height-container">
                <Dialog.Content
                  class="card"
                  onAnimationEnd={handleAnimationEnd}
                >
                  <div class="card-grid">
                    <div data-desc="left-panel" class="left-panel">
                      <Dialog.Title
                        style={{
                          ...titleTextStyles,
                          margin: "0",
                          "padding-top": "24px",
                          "padding-left": "24px",
                          "padding-right": "24px",
                          "padding-bottom": "16px",
                        }}
                      >
                        {hasAnyWalletInstalled()
                          ? "Choose wallet to connect"
                          : "Don't have a wallet?"}
                      </Dialog.Title>
                      <Dialog.Description
                        style={{
                          ...bodyTextStyles,
                          "padding-left": "24px",
                          "padding-right": "24px",
                          "padding-bottom": "30px",
                        }}
                      >
                        {hasAnyWalletInstalled()
                          ? "Start by selecting with one of the wallets below and confirming the connection."
                          : "Start by installing one of the wallets below."}
                      </Dialog.Description>
                      <div
                        class="wallets-grid-container"
                        // style={{
                        //   display: "flex",
                        //   "flex-direction": "column",
                        //   "min-height": "0",
                        //   "flex-grow": "1",
                        //   overflow: "hidden",
                        //   "padding-bottom": "24px",
                        //   "padding-left": "8px",
                        //   "padding-right": "8px",
                        // }}
                        data-desc="wallet grid container for padding"
                      >
                        <div
                          class="wallets-grid"
                          // style={{
                          //   display: "grid",
                          //   "grid-template-columns": "1fr 1fr 1fr",
                          //   "min-height": "0",
                          //   "flex-grow": "1",
                          //   "overflow-y": "auto",
                          //   "padding-bottom": "40px",
                          //   "padding-left": "8px",
                          //   "padding-right": "8px",
                          // }}
                          data-desc="wallet grid container"
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
                    </div>

                    <Show when={rightPanelDisplay().type !== "none"}>
                      <div
                        data-desc="column 2 (divider)"
                        style={{
                          "grid-area": "divider",
                        }}
                      >
                        <Divider />
                      </div>
                    </Show>

                    <Show when={rightPanelDisplay().type !== "none"}>
                      <div
                        ref={setRightPanel}
                        id="sats-connect-ui-right-panel"
                        class="right-panel"
                        data-desc="right panel"
                      >
                        <RightPanelContainer>
                          <RightPanelContentContainer>
                            <Switch fallback={null}>
                              <Match
                                when={
                                  rightPanelDisplay().type ===
                                  "install-wallet-prompt"
                                }
                              >
                                <RightPanelInstallWalletPrompt
                                  provider={
                                    (
                                      rightPanelDisplay() as TRightPanelInstallWalletPrompt
                                    ).provider
                                  }
                                />
                              </Match>
                              <Match
                                when={rightPanelDisplay().type === "explainer"}
                              >
                                <RightPanelExplainer />
                              </Match>
                              <Match
                                when={
                                  rightPanelDisplay().type === "opening-wallet"
                                }
                              >
                                <RightPanelOpeningWallet
                                  provider={
                                    (
                                      rightPanelDisplay() as TRightPanelInstallWalletPrompt
                                    ).provider
                                  }
                                />
                              </Match>
                            </Switch>
                          </RightPanelContentContainer>
                        </RightPanelContainer>
                      </div>
                    </Show>
                  </div>
                  <CloseButton onClose={handleCancelClick} />
                </Dialog.Content>
              </div>
            </div>
          </Dialog.Positioner>
        </Dialog.Root>
      </Show>
    </div>
  );
}
