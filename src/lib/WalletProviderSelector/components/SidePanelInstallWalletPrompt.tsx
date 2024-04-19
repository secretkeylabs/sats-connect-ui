import {
  bodyTextStyles,
  buttonTextStyles,
  titleTextStyles,
} from "../../styles";
import { TWalletProviderOption } from "../../utils";
import { openAppStore } from "../utils";

interface Props {
  option: TWalletProviderOption;
}

export function SidePanelInstallWalletPrompt(props: Props) {
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      openAppStore(props.option);
    }
  }
  function handleClick() {
    openAppStore(props.option);
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
          src={props.option.icon}
          alt={props.option.name}
        />
        <h1
          style={{
            ...titleTextStyles,
            "text-align": "center",
          }}
        >
          Don't have {props.option.name}?
        </h1>
        <p style={bodyTextStyles}>Download it on the Chrome web store.</p>
        <div
          class="install-prompt-button"
          role="button"
          tabIndex={0}
          on:click={handleClick}
          on:keydown={handleKeyDown}
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
