import { Dialog } from "@ark-ui/solid";
import { type JSX, createSignal, onMount } from "solid-js";
import { Portal } from "solid-js/web";

export function WalletSelector() {
  const [isOpen, setIsOpen] = createSignal(false);
  const handleWalletClick: JSX.BoundEventHandler<
    HTMLButtonElement,
    MouseEvent
  >[0] = (wallet) => {
    const event = new CustomEvent("sats-connect_wallet-selector_select", {
      detail: wallet,
      bubbles: true,
      composed: true,
    });
    window.dispatchEvent(event);
    setIsOpen(false);
  };

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
    window.addEventListener("sats-connect_wallet-selector_open", () => {
      setIsOpen(true);
    });
  });

  onMount(() => {
    window.addEventListener("sats-connect_wallet-selector_close", () => {
      setIsOpen(false);
    });
  });

  return (
    <div>
      <Dialog.Root open={isOpen()} onOpenChange={() => setIsOpen(false)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>Dialog Description</Dialog.Description>
              <ul>
                <li>
                  <button onClick={[handleWalletClick, "xverse"]}>
                    Xverse
                  </button>
                </li>
                <li>
                  <button onClick={[handleWalletClick, "leather"]}>
                    Leather
                  </button>
                </li>
                <li>
                  <button onClick={[handleWalletClick, "unisat"]}>
                    Unisat
                  </button>
                </li>
              </ul>
              <button onClick={handleCancelClick}>Cancel</button>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
}
