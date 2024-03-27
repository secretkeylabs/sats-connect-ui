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
import { Config } from "../utils";

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
import { openChromeWebStore } from "./utils";

export function WalletProviderSelector() {
  const [isVisible, setIsVisible] = createSignal(false);
  const [shouldRender, setShouldRender] = createSignal(false);
  const [providers, setProviders] = createSignal<Array<SupportedWallet>>([]);
  const [sidePanelDisplay, setSidePanelDisplay] =
    createSignal<TSidePanelDisplay>({ type: "none" });

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
      setSidePanelDisplay({ type: "install-wallet-prompt", provider });
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
        setSidePanelDisplay({ type: "explainer" });
      } else {
        setSidePanelDisplay({ type: "none" });
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
    setSidePanelDisplay({
      type: "opening-wallet",
      provider: providers().find((p) => p.id === providerId) as SupportedWallet,
    });
  }

  function handleWalletClose() {
    setSidePanelDisplay({ type: "explainer" });
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
              display: "flex",
              "flex-direction": "column",
              "justify-content": "center",
              "align-items": "center",
              height: "100%",
            }}
          >
            <Dialog.Content
              style={{
                position: "relative", // For the close button
                "border-radius": "16px",
                "max-width": hasAnyWalletInstalled() ? "780px" : "424px",
                "max-height": "calc(100% - 128px)",
                "background-color": "#FFFFFF",
                display: shouldRender() ? "block" : "none",

                "box-shadow": "0px 8px 64px 0px rgba(0, 0, 0, 0.25)",
                animation: isVisible()
                  ? "wallet-selector-fade-in 0.4s cubic-bezier(.05, .7, .1, 1) forwards"
                  : "wallet-selector-fade-out 0.2s cubic-bezier(.3, 0, .8, .15) forwards",
              }}
              onAnimationEnd={handleAnimationEnd}
            >
              <div
                style={{
                  height: "100%",
                  display: "grid",
                  "grid-template-columns": hasAnyWalletInstalled()
                    ? "5fr auto 4fr"
                    : "1fr",
                  "grid-template-areas": hasAnyWalletInstalled()
                    ? `"providers divider sidePanel"`
                    : `"providers"`,
                }}
              >
                <div
                  data-desc="column 1 (wallets)"
                  style={{
                    height: "100%",
                    overflow: "auto",
                  }}
                >
                  <div
                    style={{
                      "max-height": "100%",
                      display: "flex",
                      "flex-direction": "column",
                    }}
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
                      {hasAnyWalletInstalled()
                        ? "Choose wallet to connect"
                        : "Don't have a wallet?"}
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
                      {hasAnyWalletInstalled()
                        ? "Start by selecting with one of the wallets below and confirming the connection."
                        : "Start by installing one of the wallets below."}
                    </Dialog.Description>
                    <div
                      style={{
                        display: "flex",
                        "flex-direction": "column",
                        "min-height": "0",
                        "flex-grow": "1",
                        overflow: "hidden",
                        "padding-bottom": "24px",
                        "padding-left": "8px",
                        "padding-right": "8px",
                      }}
                      data-desc="wallet grid container for padding"
                    >
                      <div
                        style={{
                          display: "grid",
                          "grid-template-columns": "1fr 1fr 1fr",
                          "min-height": "0",
                          "flex-grow": "1",
                          "overflow-y": "auto",
                          "padding-bottom": "40px",
                          "padding-left": "8px",
                          "padding-right": "8px",
                        }}
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
                </div>

                <Show when={sidePanelDisplay().type !== "none"}>
                  <div
                    data-desc="column 2 (divider)"
                    style={{
                      "grid-area": "divider",
                    }}
                  >
                    <Divider />
                  </div>
                </Show>

                <Show when={sidePanelDisplay().type !== "none"}>
                  <div
                    data-desc="column 3 (side panel)"
                    style={{
                      "grid-area": "sidePanel",
                    }}
                  >
                    <SidePanelContainer>
                      <SidePanelContentContainer>
                        <Switch fallback={null}>
                          <Match
                            when={
                              sidePanelDisplay().type ===
                              "install-wallet-prompt"
                            }
                          >
                            <SidePanelInstallWalletPrompt
                              provider={
                                (
                                  sidePanelDisplay() as TSidePanelInstallWalletPrompt
                                ).provider
                              }
                            />
                          </Match>
                          <Match when={sidePanelDisplay().type === "explainer"}>
                            <SidePanelExplainer />
                          </Match>
                          <Match
                            when={sidePanelDisplay().type === "opening-wallet"}
                          >
                            <SidePanelOpeningWallet
                              provider={
                                (
                                  sidePanelDisplay() as TSidePanelInstallWalletPrompt
                                ).provider
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
          </Dialog.Positioner>
        </Dialog.Root>
      </Show>
    </div>
  );
}
