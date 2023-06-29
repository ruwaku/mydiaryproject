import type { Property as CSSProp } from "csstype";

interface Props {
  direction?: CSSProp.FlexDirection;
  alignItems?: CSSProp.AlignItems;
  justifyContent?: CSSProp.JustifyContent;
  gap?: CSSProp.Gap | number;
  rowGap?: CSSProp.RowGap | number;
  columnGap?: CSSProp.ColumnGap | number;
  wrap?: CSSProp.FlexWrap | true;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function FlexBox({
  direction,
  alignItems,
  justifyContent,
  gap,
  rowGap,
  columnGap,
  wrap,
  style,
  children,
  ...props
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        alignItems,
        justifyContent,
        ...(gap ? { gap } : { rowGap, columnGap }),
        flexWrap: wrap === true ? "wrap" : wrap,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
