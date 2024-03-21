import { createSignal } from "solid-js";

import { ProviderOption } from "./utils";

interface Props extends ProviderOption {
  onProviderSelected: (walletId: string) => void;
}

export function WalletProviderOption(props: Props) {
  function handleWalletSelected() {
    if (props.installPrompt) {
      window.open(props.installPrompt.url, "_blank");
      return;
    }

    props.onProviderSelected(props.id);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (props.installPrompt) {
      // Handle required ARIA keyboard events for links
      // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/link_role
      if (e.key === "Enter") {
        handleWalletSelected();
        return;
      }
      return;
    }

    // Handle required ARIA keyboard events for buttons
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role
    if (e.key === "Enter" || e.key === " ") {
      handleWalletSelected();
    }
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
      onClick={handleWalletSelected}
      onKeyDown={handleKeyDown}
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
          "font-size": "14px",
          "text-align": "center",
        }}
      >
        {props.name}
      </div>
    </div>
  );
}
