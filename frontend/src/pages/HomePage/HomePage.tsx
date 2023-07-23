import Avatar from "antd/es/avatar";
import Divider from "antd/es/divider";
import Typography from "antd/es/typography";
import Clock from "components/Clock/Clock";
import DiaryCalendar from "components/DiaryCalendar/DiaryCalendar";
import FlexBox from "components/FlexBox/FlexBox";
import RemixIcon from "components/RemixIcon/RemixIcon";
import dayjs from "dayjs";
import useAuthSession from "hooks/useAuthSession";

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
                <Clock date={dayjs()} interval={1000} />
              </span>
            </Typography.Text>
            <Divider />
            <DiaryCalendar />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    );
  return null;
}
