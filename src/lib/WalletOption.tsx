interface Props {
  name: string;
  icon: string;
  onWalletSelected: (wallet: string) => void;
}

export function WalletOption(props: Props) {
  function handleWalletSelected(wallet: string) {
    props.onWalletSelected(wallet);
  }

  return (
    <button
      style={{
        display: "flex",
        "flex-direction": "column",
        "row-gap": "12px",
      }}
      onClick={[handleWalletSelected, props.name]}
    >
      <img
        style={{
          width: "56px",
          height: "56px",
          "object-fit": "cover",
          "border-radius": "12px",
        }}
        src={props.icon}
        alt={props.name}
      />
      <div>{props.name}</div>
    </button>
  );
}
