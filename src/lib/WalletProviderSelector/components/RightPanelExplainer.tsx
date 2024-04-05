import { bodyTextStyles, titleTextStyles } from "../../styles";

export function RightPanelExplainer() {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        "row-gap": "8px",
        "justify-content": "center",
        "align-items": "center",
      }}
    >
      <div
        style={{
          "font-size": "50px",
          "line-height": "140%",
        }}
      >
        🤔
      </div>
      <div style={titleTextStyles}>What is a wallet?</div>
      <p style={bodyTextStyles}>
        Wallets let you send, receive, store and display digital assets like
        Bitcoin, Stacks, Ordinals & NFTs.
      </p>
      <p style={bodyTextStyles}>
        Explore Bitcoin apps by connecting your wallet.
      </p>
    </div>
  );
}
