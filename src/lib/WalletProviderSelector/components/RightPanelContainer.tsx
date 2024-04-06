import { ParentProps } from "solid-js";

export function RightPanelContainer(props: ParentProps) {
  return (
    <div
      style={{
        padding: "24px",
        height: "100%",
      }}
    >
      {props.children}
    </div>
  );
}
