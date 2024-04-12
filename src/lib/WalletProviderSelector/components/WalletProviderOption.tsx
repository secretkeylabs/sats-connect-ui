import { createMemo, createSignal } from "solid-js";

import { bodyTextStyles } from "../../styles";
import { TWalletProviderOption, hasInstallPrompt } from "../../utils";

interface Props extends TWalletProviderOption {
  onProviderSelected: (walletId: string) => void;
}

export function WalletProviderOption(props: Props) {
  function handleWalletSelected() {
    props.onProviderSelected(props.id);
  }

  const role = createMemo(() => (hasInstallPrompt(props) ? "button" : "link"));

  function handleKeyDown(e: KeyboardEvent) {
    if (role() === "link") {
      // Handle required ARIA keyboard events for links
      // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/link_role
      if (e.key === "Enter") {
        handleWalletSelected();
      }
      return;
    }

    if (role() === "button") {
      // Handle required ARIA keyboard events for buttons
      // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role
      if (e.key === "Enter" || e.key === " ") {
        handleWalletSelected();
      }
      return;
    }
  }

  const [isMouseOver, setIsMouseOver] = createSignal(false);
  const [isFocused, setIsFocused] = createSignal(false);

  const isOutlined = () => isMouseOver() || isFocused();

  const focusOutlineColor = "rgba(24, 24, 24, 0.20)";
  const focusTextColor = "rgba(24, 24, 24, 0.60)";

  return (
    <div
      style={{
        "aspect-ratio": "1 / 1",
        overflow: "hidden",
      }}
    >
      <div
        role={role()}
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
            ...bodyTextStyles,
            color: isOutlined() ? focusTextColor : undefined,
            "text-align": "center",
          }}
        >
          {props.name}
        </div>
      </div>
    </div>
  );
}
