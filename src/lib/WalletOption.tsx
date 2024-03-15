import { createSignal } from "solid-js";

interface Props {
  name: string;
  icon: string;
  onWalletSelected: (wallet: string) => void;
}

export function WalletOption(props: Props) {
  function handleWalletSelected(wallet: string) {
    props.onWalletSelected(wallet);
  }

  const [isMouseOver, setIsMouseOver] = createSignal(false);
  const [isFocused, setIsFocused] = createSignal(false);

  const isOutlined = () => isMouseOver() || isFocused();

  const outlineColor = "#585a5e";

  return (
    <div
      role="button"
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
      onClick={[handleWalletSelected, props.name]}
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
          outline: isOutlined() ? `6px solid ${outlineColor}` : "none",
        }}
        src={props.icon}
        alt={props.name}
      />
      <div>{props.name}</div>
    </div>
  );
}
