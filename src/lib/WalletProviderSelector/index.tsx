import { Dialog } from "@ark-ui/solid";
import { For, Match, Show, Switch, batch, onCleanup, onMount } from "solid-js";
import { createSignal } from "solid-js";

import {
  cancel,
  close,
  open,
  select,
  walletClose,
  walletOpen,
} from "../constants";
import { bodyTextStyles, titleTextStyles } from "../styles";
import {
  Config,
  TWalletProviderOption,
  hasInstallPrompt,
  isInstalled,
} from "../utils";

import { CloseButton } from "./components/CloseButton";
import { CssReset } from "./components/CssReset";
import { Divider } from "./components/Divider";
import { SidePanelContainer } from "./components/SidePanelContainer";
import { SidePanelContentContainer } from "./components/SidePanelContentContainer";
import { SidePanelExplainer } from "./components/SidePanelExplainer";
import { SidePanelInstallWalletPrompt } from "./components/SidePanelInstallWalletPrompt";
import { SidePanelOpeningWallet } from "./components/SidePanelOpeningWallet";
import { WalletProviderOption } from "./components/WalletProviderOption";
import { TSidePanelDisplay, TSidePanelInstallWalletPrompt } from "./types";
import { openAppStore } from "./utils";

const cardRadius = "24px";

export function WalletProviderSelector() {
  const [root, setRoot] = createSignal<HTMLDivElement>();
  const [sidePanel, setSidePanel] = createSignal<HTMLDivElement>();

  /**
   * Checks if the side panel is showing. Used to determine the click behavior
   * of wallet provider options. See
   * [`option-click-behavior.md`](../../../docs/option-click-behavior.md) for
   * details.
   */
  function isShowingSidePanel() {
    const rootEl = root();
    const sidePanelEl = sidePanel();
    if (!rootEl || !sidePanelEl) return false;

    if (!rootEl.contains(sidePanelEl)) return false;

    const displayStyle = getComputedStyle(sidePanelEl).display;
    if (displayStyle === "none") return false;

    return true;
  }

  const [isVisible, setIsVisible] = createSignal(false);
  const [shouldRender, setShouldRender] = createSignal(false);
  const [options, setOptions] = createSignal<Array<TWalletProviderOption>>([]);
  const [sidePanelConfig, setSidePanelConfig] = createSignal<TSidePanelDisplay>(
    { type: "none" },
  );

  const hasAnyWalletInstalled = () => options().some((p) => isInstalled(p));

  const triggerFadeOut = () => setIsVisible(false);

  function handleCancelClick() {
    if (typeof window === "undefined") return;
    const event = new CustomEvent(cancel, {
      bubbles: true,
      composed: true,
    });
    window.dispatchEvent(event);
    triggerFadeOut();
  }

  function handleWalletSelected(walletId: string) {
    const option = options().find(
      (p) => p.id === walletId,
    ) as TWalletProviderOption;

    if (hasInstallPrompt(option)) {
      if (!isShowingSidePanel()) {
        openAppStore(option);
      } else {
        setSidePanelConfig({ type: "install-wallet-prompt", option });
      }
      return;
    }
    if (typeof window === "undefined") return;
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

      const options = e.detail.options;
      setOptions(options);

      if (options.some((p) => !p.installPrompt)) {
        setSidePanelConfig({ type: "explainer" });
      } else {
        setSidePanelConfig({ type: "none" });
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
    const optionId = e.detail;
    setSidePanelConfig({
      type: "opening-wallet",
      option: options().find(
        (option) => option.id === optionId,
      ) as TWalletProviderOption,
    });
  }

  function handleWalletClose() {
    setSidePanelConfig({ type: "explainer" });
  }

  onMount(() => {
    if (typeof window === "undefined") return;
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
    if (typeof window === "undefined") return;
    window.removeEventListener(open, handleOpen);
    window.removeEventListener(close, handleClose);
  });

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
      <style>{`
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
          height: 100%;
          
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas: "mainPanel";
        }

        .main-panel {
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          grid-area: mainPanel;
        }

        .wallets-grid-container {
          overflow: auto;
          flex-grow: 1;
        }

        .wallets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          align-content: start;

          padding-left: 24px;
          padding-right: 24px;
          padding-bottom: 40px;
        }

        .divider {
          display: none;
          grid-area: divider;
        }

        .side-panel {
          display: none;
          grid-area: sidePanel;
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
                ? `"mainPanel divider sidePanel"`
                : `"mainPanel"`
            };
          }

          .divider {
            display: block;
          }

          .side-panel {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
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
                    <div class="main-panel">
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
                        data-desc="wallet grid container for padding"
                      >
                        <div
                          class="wallets-grid"
                          data-desc="wallet grid container"
                        >
                          <For each={options()}>
                            {(option) => (
                              <WalletProviderOption
                                {...option}
                                onProviderSelected={handleWalletSelected}
                              />
                            )}
                          </For>
                        </div>
                      </div>
                    </div>

                    <Show when={sidePanelConfig().type !== "none"}>
                      <Divider />
                    </Show>

                    <Show when={sidePanelConfig().type !== "none"}>
                      <div ref={setSidePanel} class="side-panel">
                        <SidePanelContainer>
                          <SidePanelContentContainer>
                            <Switch fallback={null}>
                              <Match
                                when={
                                  sidePanelConfig().type ===
                                  "install-wallet-prompt"
                                }
                              >
                                <SidePanelInstallWalletPrompt
                                  option={
                                    (
                                      sidePanelConfig() as TSidePanelInstallWalletPrompt
                                    ).option
                                  }
                                />
                              </Match>
                              <Match
                                when={sidePanelConfig().type === "explainer"}
                              >
                                <SidePanelExplainer />
                              </Match>
                              <Match
                                when={
                                  sidePanelConfig().type === "opening-wallet"
                                }
                              >
                                <SidePanelOpeningWallet
                                  option={
                                    (
                                      sidePanelConfig() as TSidePanelInstallWalletPrompt
                                    ).option
                                  }
                                />
                              </Match>
                            </Switch>
                          </SidePanelContentContainer>
                        </SidePanelContainer>
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
