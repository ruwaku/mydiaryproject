import Tooltip from "antd/es/tooltip";
import Typography from "antd/es/typography";
import RemixIcon from "components/RemixIcon/RemixIcon";
import dayjs from "dayjs";

const format = "YYYY년 MM월 DD일(dd)";

interface Props {
  storyDate: Date;
  updatedAt: Date;
}
export default function StoryTimestamp({ storyDate, updatedAt }: Props) {
  const raw = [dayjs(storyDate).format(format), dayjs(updatedAt).format(format)];
  const relative =
    Math.abs(dayjs().diff(dayjs(updatedAt), "days")) >= 7
      ? raw
      : [dayjs(storyDate).from(dayjs()), dayjs(updatedAt).from(dayjs())];
  return (
    <Typography.Text>
      <RemixIcon name="calendar" style={{ marginRight: 4 }} />
      <Typography.Text>{raw[0]}</Typography.Text>
      <Tooltip
        placement="topRight"
        title={`마지막 수정: ${raw[1]}`}
        overlayStyle={{
          maxWidth: "unset",
          width: "auto",
        }}
      >
        <Typography.Text type="secondary" style={{ marginLeft: 15 }}>
          {relative[1]}에 마지막으로 수정함
        </Typography.Text>
      </Tooltip>
    </Typography.Text>
  );
}
