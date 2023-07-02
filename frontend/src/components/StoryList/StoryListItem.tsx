import List from "antd/es/list";
import Clock from "components/Clock/Clock";
import RemixIcon from "components/RemixIcon/RemixIcon";
import dayjs from "dayjs";
import { htmlToText } from "html-to-text";
import { Link } from "react-router-dom";
import { StoryData } from "types/story";

interface Props {
  story: StoryData;
}
export default function StoryListItem({ story }: Props) {
  const { storyId, title } = story;
  const createdAt = dayjs(story.createdAt.toDate());
  const updatedAt = dayjs(story.updatedAt.toDate());
  const updated = createdAt.diff(updatedAt, "second") >= 1;
  const descMaxLength = 200;
  let content = htmlToText(story.contentHTML.replace(/<img[^>]*>/g, ""));
  if (content.length > descMaxLength) content = content.substring(0, descMaxLength - 1) + "...";
  return (
    <List.Item
      key={title}
      extra={
        <img
          style={{ width: "12rem" }}
          alt="썸네일"
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        />
      }
      style={{ wordBreak: "break-all" }}
    >
      <List.Item.Meta
        title={<Link to={`/story/${storyId}`}>{title}</Link>}
        description={
          <>
            <RemixIcon name="time" />
            <span>
              <Clock date={createdAt} />
              {updated && (
                <span style={{ marginLeft: 10 }}>
                  (<Clock date={updatedAt} /> 수정됨)
                </span>
              )}
            </span>
          </>
        }
      />
      {content}
    </List.Item>
  );
}
