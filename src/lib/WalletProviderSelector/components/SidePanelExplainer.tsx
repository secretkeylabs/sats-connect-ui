export function SidePanelExplainer() {
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
      <div
        style={{
          "font-size": "18px",
          "font-weight": "700",
          "line-height": "140%",
        }}
      >
        What is a wallet?
      </div>
      <p>
        Wallets let you send, receive, store and display digital assets like
        Bitcoin, Stacks, Ordinals & NFTs.
      </p>
      <p>Explore Bitcoin apps by connecting your wallet.</p>
    </div>
  );
}
