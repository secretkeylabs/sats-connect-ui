const SvgComponent = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="10"
      cy="10"
      r="9.05"
      stroke="black"
      stroke-width="1.9"
      fill="none"
      stroke-dasharray="42.65 14.22"
      stroke-dashoffset="0"
    >
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 10 10"
        to="360 10 10"
        dur="0.5s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export function Spinner() {
  return (
    <>
      <div
        style={{
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
          height: "100%",
          animation: "spin 1s linear infinite",
        }}
      >
        <SvgComponent />
      </div>
    </>
  );
}
