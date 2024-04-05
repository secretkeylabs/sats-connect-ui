import { SupportedWallet } from "@sats-connect/core";

import { bodyTextStyles, titleTextStyles } from "../../styles";

import { Spinner } from "./Spinner";

interface Props {
  provider: SupportedWallet;
}

export function RightPanelOpeningWallet(props: Props) {
  return (
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
        Opening {props.provider.name}...
      </h1>
      <p style={bodyTextStyles}>
        Confirm the operation in {props.provider.name}
      </p>
      <Spinner />
    </div>
  );
}
