import Title from "antd/es/typography/Title";
import FlexBox from "components/FlexBox/FlexBox";

export default function Logo() {
  return (
    <FlexBox
      alignItems="center"
      justifyContent="flex-start"
      columnGap="0.5rem"
      style={{ paddingLeft: "0.5rem" }}
    >
      <img
        src="/resource/app_logo.png"
        alt="로고"
        style={{
          display: "block",
          borderRadius: 6,
          overflow: "hidden",
          position: "relative",
          width: 40,
          height: 40,
          flexShrink: 0,
        }}
      />
      <Title style={{ margin: 0, flexShrink: 0, fontSize: "1.6rem" }}>My Diary</Title>
    </FlexBox>
  );
}
