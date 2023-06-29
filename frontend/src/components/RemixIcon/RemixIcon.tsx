import type { Property as CSSProp } from "csstype";

interface Props {
  name: string;
  suffix?: string;
  fontSize?: CSSProp.FontSize;
  style?: React.CSSProperties;
}

export default function RemixIcon({ name, suffix, fontSize, style, ...props }: Props) {
  return (
    <i
      className={`ri-${name}-${suffix ?? "line"}`}
      style={{ verticalAlign: "middle", fontSize, ...style }}
    />
  );
  // return (
  //   <span
  //     style={{
  //       display: "inline-flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //       overflow: "hidden",
  //       verticalAlign: "middle",
  //       fontSize: fontSize,
  //       ...style,
  //     }}
  //     className="anticon" //hack
  //     {...props}
  //   >
  //     <i className={`ri-${name}-${suffix || "line"}`} />
  //   </span>
  // );
}
