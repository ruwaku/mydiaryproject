import Badge from "antd/es/badge";
import Calendar, { CalendarProps } from "antd/es/calendar";
import useModal from "antd/es/modal/useModal";
import Space from "antd/es/space";
import fetchStories from "apis/fetchStories";
import FlexBox from "components/FlexBox/FlexBox";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoryData } from "types/story";

function getFirstDayOfCalendar(day: Dayjs): Dayjs {
  const firstDayOfMonth = day.startOf("month");
  return firstDayOfMonth.subtract(firstDayOfMonth.day(), "day").startOf("day");
}
function getLastDayOfCalendar(day: Dayjs): Dayjs {
  const firstDayOfCalendar = getFirstDayOfCalendar(day);
  return firstDayOfCalendar.add(41, "day").endOf("day");
}

export default function DiaryCalendar() {
  const [stories, setStories] = useState<{ [date: string]: StoryData[] }>();
  const [modal, modalContextHolder] = useModal();
  const navigate = useNavigate();
  const handleClickDate = (date: Dayjs) => {
    modal.info({
      title: date.format("YYYY-MM-DD"),
      content: (
        <Space direction="vertical" size={3}>
          {stories![date.format("YYYY-MM-DD")]?.map((story, i) => (
            <Badge
              key={i}
              status="default"
              text={<Link to={`/story/${story.storyId}`}>{story.title}</Link>}
            />
          ))}
        </Space>
      ),
      okButtonProps: { type: "default" },
      okText: "이 날짜에 새 일기 쓰기",
      onOk() {
        navigate("/story/editor?date=" + date.format("YYYY-MM-DD"));
      },
      closable: true,
      maskClosable: true,
    });
  };
  const handlePanelChange: CalendarProps<Dayjs>["onPanelChange"] = (date, mode) => {
    if (mode === "month") {
      const firstDay = getFirstDayOfCalendar(date);
      const lastDay = getLastDayOfCalendar(date);
      fetchStories({ dateRange: [firstDay, lastDay] }).then((data) => {
        const result = Array(lastDay.diff(firstDay, "day") + 1)
          .fill(null)
          .map(
            (_, i) =>
              [
                firstDay.add(i, "day").format("YYYY-MM-DD"),
                data.results.filter((story) =>
                  firstDay.add(i, "day").isSame(dayjs(story.storyDate.toDate()), "day")
                ),
              ] ?? null
          );
        setStories(Object.fromEntries(result));
      });
    }
  };
  useEffect(() => {
    handlePanelChange(dayjs(), "month");
  }, []);
  return (
    <>
      {modalContextHolder}
      <Calendar
        validRange={[dayjs("2022-01-01"), dayjs().endOf("second")]}
        onPanelChange={handlePanelChange}
        cellRender={(date, info) => (
          <FlexBox
            direction="column"
            gap={3}
            style={{ minHeight: "100%" }}
            onClick={() => handleClickDate(date)}
          >
            {info.type === "date" &&
              stories &&
              stories[date.format("YYYY-MM-DD")]?.map((story, i) => (
                <Badge key={i} status="default" text={story.title} />
              ))}
          </FlexBox>
        )}
      />
    </>
  );
}
