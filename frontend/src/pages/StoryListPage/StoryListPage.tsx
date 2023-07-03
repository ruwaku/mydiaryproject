import Button from "antd/es/button";
import Space from "antd/es/space";
import Typography from "antd/es/typography";
import FlexBox from "components/FlexBox/FlexBox";
import RemixIcon from "components/RemixIcon/RemixIcon";
import StoryList from "components/StoryList/StoryList";
import { Link } from "react-router-dom";

export default function StoryListPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <FlexBox justifyContent="space-between" alignItems="center">
        <Typography.Title style={{ margin: 0 }}>Stories</Typography.Title>
        <Link to="/story/editor">
          <Button size="large" type="primary" style={{ display: "block", height: "auto" }}>
            <RemixIcon name="add" />
            <span>새 일기 쓰기</span>
          </Button>
        </Link>
      </FlexBox>
      <StoryList />
    </Space>
  );
}
