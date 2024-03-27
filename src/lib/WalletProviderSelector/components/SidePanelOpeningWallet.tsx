import { SupportedWallet } from "@sats-connect/core";

import { Spinner } from "./Spinner";

interface Props {
  provider: SupportedWallet;
}

export function SidePanelOpeningWallet(props: Props) {
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
          "text-align": "center",
        }}
      >
        Opening {props.provider.name}...
      </h1>
      <p>Confirm the operation in {props.provider.name}</p>
      <Spinner />
    </div>
  );
}
