import Tooltip from "antd/es/tooltip";
import dayjs from "dayjs";

const format = "YYYY년 MM월 DD일(dd) HH:mm:ss";

interface Props {
  createdAt: Date;
  updatedAt: Date;
}
export default function StoryTimestamp({ createdAt, updatedAt }: Props) {
  const updated = Math.abs(createdAt.getTime() - updatedAt.getTime()) >= 1000;
  const raw = [dayjs(createdAt).format(format), dayjs(updatedAt).format(format)];
  const relative =
    Math.abs(dayjs(createdAt).diff(dayjs.utc(), "days")) >= 7
      ? [raw[0], raw[1]]
      : [dayjs(createdAt).from(dayjs.utc()), dayjs(updatedAt).from(dayjs.utc())];
  return (
    <span>
      <Tooltip
        title={
          <>
            최초 작성: {raw[0]}
            {updated && (
              <>
                <br />
                최근 수정: {raw[1]}
              </>
            )}
          </>
        }
        overlayStyle={{
          maxWidth: "unset",
          width: "auto",
        }}
      >
        {relative[0]}
        {updated && <span style={{ marginLeft: 5 }}>({relative[1]}에 수정함)</span>}
      </Tooltip>
    </span>
  );
}
