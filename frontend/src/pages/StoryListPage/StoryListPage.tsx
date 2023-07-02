import Button from "antd/es/button";
import Space from "antd/es/space";
import Typography from "antd/es/typography";
import LoginFallback from "components/LoginFallback/LoginFallback";
import RemixIcon from "components/RemixIcon/RemixIcon";
import StoryList from "components/StoryList/StoryList";
import useAuthSession from "hooks/useAuthSession";
import { Link } from "react-router-dom";

export default function StoryListPage() {
  const authSession = useAuthSession();
  if (authSession.status === "pending") {
    return null;
  } else if (authSession.status === "authenticated") {
    return (
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space>
          <Typography.Title style={{ margin: 0 }}>Story</Typography.Title>
          <Link to="/story/editor">
            <Button
              shape="circle"
              size="large"
              style={{ width: "2rem", height: "2rem", display: "block" }}
            >
              <RemixIcon name="add" fontSize="1.5rem" />
            </Button>
          </Link>
        </Space>
        <StoryList />
      </Space>
    );
  } else {
    return <LoginFallback />;
  }
}
