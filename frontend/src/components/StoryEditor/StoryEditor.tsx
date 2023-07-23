import Button from "antd/es/button";
import DatePicker from "antd/es/date-picker";
import Input from "antd/es/input";
import Space from "antd/es/space";
import Spin from "antd/es/spin";
import createStory from "apis/createStory";
import editStory from "apis/editStory";
import FlexBox from "components/FlexBox/FlexBox";
import RemixIcon from "components/RemixIcon/RemixIcon";
import Wysiwyg, { WysiwygRef } from "components/Wysiwyg/Wysiwyg";
import dayjs, { Dayjs } from "dayjs";
import { Timestamp } from "firebase/firestore";
import usePreventLeave from "hooks/usePreventLeave";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoryData } from "types/story";

interface Props {
  originalStory?: StoryData;
}
export default function StoryEditor({ originalStory }: Props) {
  const navigate = useNavigate();
  const isEditMode = !!originalStory;
  const defaultHTML = originalStory?.contentHTML;
  const [canLeave, setCanLeave] = useState(false);
  const [storyTitle, setStoryTitle] = useState(originalStory?.title);
  const [storyDate, setStoryDate] = useState<Dayjs>(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const wysiwygRef = useRef<WysiwygRef>(null);
  usePreventLeave(!canLeave);
  const handleSubmit = () => {
    const context = wysiwygRef.current;
    if (context) {
      if (!storyTitle || storyTitle.length < 1) {
        alert("제목을 입력해주세요");
        return false;
      }
      if (!context.contentHTML) {
        alert("내용을 입력해주세요");
        return false;
      }
      if (isEditMode) {
        setIsLoading(true);
        editStory({
          storyId: originalStory.storyId,
          storyDate: Timestamp.fromDate(storyDate.toDate()),
          title: storyTitle,
          contentHTML: context.contentHTML,
        }).then(() => {
          setCanLeave(true);
          setTimeout(() => navigate(`/story/${originalStory.storyId}`), 50);
        });
      } else {
        setIsLoading(true);
        createStory({
          storyDate: Timestamp.fromDate(storyDate.toDate()),
          title: storyTitle,
          contentHTML: context.contentHTML,
        }).then((newStoryId) => {
          setCanLeave(true);
          setTimeout(() => navigate(`/story/${newStoryId}`), 50);
        });
      }
    }
  };
  if (isLoading) {
    return (
      <FlexBox justifyContent="center" alignItems="center" style={{ padding: "3rem 0" }}>
        <Spin size="large" />
      </FlexBox>
    );
  }
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <FlexBox gap={10}>
        <DatePicker
          placeholder="일기 날짜"
          value={storyDate}
          showTime={false}
          onChange={(date) => date && setStoryDate(date)}
          allowClear={false}
        />
        <Input
          value={storyTitle}
          onChange={({ target: { value } }) => setStoryTitle(value)}
          size="large"
          placeholder="제목을 입력하세요"
          maxLength={70}
        />
      </FlexBox>
      <Wysiwyg defaultHTML={defaultHTML} ref={wysiwygRef} />
      <Button
        size="large"
        type="primary"
        onClick={handleSubmit}
        style={{ position: "absolute", top: "calc(100% + 1rem)", right: "1rem" }}
      >
        <RemixIcon name="check" style={{ marginRight: 5 }} />
        {originalStory ? "수정 끝" : "작성 끝"}
      </Button>
    </Space>
  );
}
