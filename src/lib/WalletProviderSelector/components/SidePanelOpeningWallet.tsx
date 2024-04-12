import { bodyTextStyles, titleTextStyles } from "../../styles";
import { TWalletProviderOption } from "../../utils";

import { Spinner } from "./Spinner";

interface Props {
  option: TWalletProviderOption;
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
        src={props.option.icon}
        alt={props.option.name}
      />
      <h1
        style={{
          ...titleTextStyles,
          "text-align": "center",
        }}
      >
        Opening {props.option.name}...
      </h1>
      <p style={bodyTextStyles}>Confirm the operation in {props.option.name}</p>
      <Spinner />
    </div>
  );
}
