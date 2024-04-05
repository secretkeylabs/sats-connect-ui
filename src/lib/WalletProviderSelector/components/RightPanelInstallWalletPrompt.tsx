import { SupportedWallet } from "@sats-connect/core";

import {
  bodyTextStyles,
  buttonTextStyles,
  titleTextStyles,
} from "../../styles";
import { openChromeWebStore } from "../utils";

interface Props {
  provider: SupportedWallet;
}

export function RightPanelInstallWalletPrompt(props: Props) {
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      openChromeWebStore(props.provider);
    }
  }
  function handleClick() {
    openChromeWebStore(props.provider);
  }
  return (
    <>
      <style>
        {`
          .install-prompt-button:focus-visible {
            outline: 2px solid #181818;
            outline-offset: 2px;
          }
        `}
      </style>
      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          "align-items": "center",
          "row-gap": "16px",
        }}
      >
        <img
          style={{
            "border-radius": "12px",
            height: "64px",
            width: "64px",
            "object-fit": "cover",
          }}
          src={props.provider.icon}
          alt={props.provider.name}
        />
        <h1
          style={{
            ...titleTextStyles,
            "text-align": "center",
          }}
        >
          Don't have {props.provider.name}?
        </h1>
        <p style={bodyTextStyles}>Download it on the Chrome web store.</p>
        <div
          class="install-prompt-button"
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          style={{
            ...buttonTextStyles,
            cursor: "pointer",
            "border-radius": "12px",
            background: "#181818",
            color: "white",
            padding: "12px 16px",
          }}
        >
          Get
        </div>
      </div>
    </>
  );
}
