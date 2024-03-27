import { ParentProps } from "solid-js";

export function SidePanelContentContainer(props: ParentProps) {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        "justify-content": "center",
        "align-items": "center",
        height: "100%",
      }}
    >
      {props.children}
    </div>
  );
}
