"use client";
import Avatar from "antd/es/avatar";
import FlexBox from "components/FlexBox/FlexBox";
import LoginFallback from "components/LoginFallback/LoginFallback";
import useAuthSession from "hooks/useAuthSession";
import Typography from "antd/es/typography";
import Divider from "antd/es/divider";
import Clock from "components/Clock/Clock";
import RemixIcon from "components/RemixIcon/RemixIcon";
import DailyAssistant from "components/DailyAssistant/DailyAssistant";

export default function HomePage() {
  const authSession = useAuthSession();
  if (authSession.status === "authenticated")
    return (
      <FlexBox alignItems="center" justifyContent="center" wrap>
        <FlexBox direction="column" style={{ width: "100%" }}>
          <FlexBox alignItems="center" justifyContent="center" gap="0.5rem">
            <Avatar
              size="large"
              icon={<img alt="프로필 사진" src={authSession.current.photoURL!} />}
              style={{ flexShrink: 0 }}
            />
            <Typography.Title level={3} style={{ margin: 0 }}>
              {authSession.current.displayName} 님 안녕하세요
            </Typography.Title>
          </FlexBox>
          <FlexBox direction="column" alignItems="center" style={{ marginTop: "1.25rem" }}>
            <Typography.Text>
              <RemixIcon name="time" />{" "}
              <span>
                <Clock format="YYYY년 MM월 DD일 (dd), hh시 mm분 ss초" interval={1000} />
              </span>
            </Typography.Text>
            <Divider />
            <DailyAssistant />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    );
  if (authSession.status === "unauthenticated") return <LoginFallback />;
  return null;
}
