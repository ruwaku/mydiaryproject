import FlexBox from "components/FlexBox/FlexBox";
import Divider from "antd/es/divider";
import Typography from "antd/es/typography";

export default function AboutPage() {
  return (
    <FlexBox direction="column" gap="2rem">
      <FlexBox columnGap="1.5rem" rowGap="1rem" wrap>
        <div style={{ margin: "0 auto" }}>
          <img
            src="/resource/app_logo.png"
            style={{ borderRadius: 10, width: 150, height: 150 }}
            alt="로고"
          />
        </div>
        <FlexBox
          direction="column"
          justifyContent="center"
          style={{ margin: "0 auto", flex: "1 0" }}
        >
          <Typography.Title>My Diary</Typography.Title>
          <Typography.Text>
            Created By Dongmin
            <Divider type="vertical" />
            Powered By React
          </Typography.Text>
        </FlexBox>
      </FlexBox>
      {/* {authSession.status === "authenticated" && (
        <FlexBox
          justifyContent="space-between"
          alignItems="center"
          style={{ background: antd.token.colorBgContainer, padding: "1.5rem", borderRadius: 4 }}
        >
          <FlexBox alignItems="center" gap="0.5rem">
            <Avatar
              size="large"
              icon={
                <Image alt="프로필 사진" src={authSession.current.photoURL!} fill quality="100" />
              }
              style={{ flexShrink: 0 }}
            />
            <Typography.Title level={3} style={{ margin: 0 }}>
              {authSession.current.displayName}
            </Typography.Title>
          </FlexBox>
          <Button
            onClick={() => {
              fbAuthClient.signOut();
            }}
          >
            로그아웃
          </Button>
        </FlexBox>
      )} */}
    </FlexBox>
  );
}
