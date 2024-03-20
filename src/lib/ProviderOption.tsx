import { createSignal } from "solid-js";

import { ProviderOption } from "./utils";

interface Props extends ProviderOption {
  onWalletSelected: (walletId: string) => void;
}

export function WalletOption(props: Props) {
  function handleWalletSelected(walletId: string) {
    if (props.installPrompt) {
      window.open(props.installPrompt.url, "_blank");
      return;
    }

    props.onWalletSelected(walletId);
  }

  const [isMouseOver, setIsMouseOver] = createSignal(false);
  const [isFocused, setIsFocused] = createSignal(false);

  const isOutlined = () => isMouseOver() || isFocused();

  const focusOutlineColor = "rgba(24, 24, 24, 0.20)";
  const focusTextColor = "rgba(24, 24, 24, 0.60)";

  return (
    <div
      role={props.installPrompt ? "link" : "button"}
      tabIndex={0}
      style={{
        display: "flex",
        "flex-direction": "column",
        "row-gap": "12px",
        "align-items": "center",
        cursor: "pointer",
        outline: "none",
        "padding-top": "10px",
      }}
      onClick={[handleWalletSelected, props.id]}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <img
        style={{
          width: "56px",
          height: "56px",
          "object-fit": "cover",
          "border-radius": "12px",
          outline: isOutlined() ? `6px solid ${focusOutlineColor}` : "none",
        }}
        src={props.icon}
        alt={props.name}
      />
      <div
        style={{
          color: isOutlined() ? focusTextColor : undefined,
        }}
      >
        {props.name}
      </div>
    </div>
  );
}
