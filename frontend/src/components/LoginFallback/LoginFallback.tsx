import Divider from "antd/es/divider";
import Space from "antd/es/space";
import Typography from "antd/es/typography";
import FlexBox from "components/FlexBox/FlexBox";
import KakaoLoginButton from "components/OAuth/KakaoLoginButton/KakaoLoginButton";

interface Props {
  title?: string;
}

export default function LoginFallback({ title }: Props) {
  return (
    <FlexBox
      direction="column"
      alignItems="center"
      style={{
        padding: "1.25rem 0.75rem 2rem",
        borderRadius: 12,
      }}
    >
      <Space align="center" style={{ marginBottom: "1rem" }}>
        <img
          src="/resource/app_logo.png"
          alt="My Diary 로고"
          style={{ width: 32, height: 32, display: "block", borderRadius: 5 }}
        />
        <Typography.Title level={2} style={{ margin: 0 }}>
          My Diary
        </Typography.Title>
      </Space>
      <Divider>로그인 후 이용할 수 있습니다</Divider>
      <Space direction="vertical">
        <KakaoLoginButton />
      </Space>
    </FlexBox>
  );
}
