import Typography from "antd/es/typography";
import List from "antd/es/list";
import { htmlToText } from "html-to-text";
import { Link } from "react-router-dom";
import { StoryData } from "types/story";
import theme from "antd/es/theme";
import Empty from "antd/es/empty";
import StoryTimestamp from "components/StoryTimestamp/StoryTimestamp";

const imgSrcRegExp = /<img.+src=(?:"|')(.+?)(?:"|')(?:.+?)>/;

interface Props {
  story: StoryData;
}
export default function StoryListItem({ story }: Props) {
  const { token: antdToken } = theme.useToken();
  const { storyId, title } = story;
  const storyDate = story.storyDate.toDate();
  const updatedAt = story.updatedAt.toDate();
  const descMaxLength = 200;
  const firstImgSrc = story.contentHTML.match(imgSrcRegExp)?.[1];
  let content = htmlToText(story.contentHTML.replace(/<img[^>]*>/g, ""));
  if (content.length > descMaxLength) content = content.substring(0, descMaxLength - 1) + "...";
  return (
    <List.Item
      key={title}
      extra={
        <Link to={`/story/${storyId}`}>
          <div
            style={{
              width: "12rem",
              height: "8rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: antdToken.colorBgLayout,
            }}
          >
            {firstImgSrc ? (
              <img
                src={firstImgSrc}
                alt="썸네일"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              <Empty description={false} />
            )}
          </div>
        </Link>
      }
      style={{ wordBreak: "break-all" }}
    >
      <List.Item.Meta
        title={
          <Link to={`/story/${storyId}`}>
            <Typography.Title level={5}>{title}</Typography.Title>
          </Link>
        }
        description={
          <>
            <Typography.Text type="secondary">
              <StoryTimestamp storyDate={storyDate} updatedAt={updatedAt} />
            </Typography.Text>
          </>
        }
      />
      {content}
    </List.Item>
  );
}
