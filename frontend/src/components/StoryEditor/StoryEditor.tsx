import Button from "antd/es/button";
import Input from "antd/es/input";
import Space from "antd/es/space";
import Spin from "antd/es/spin";
import FlexBox from "components/FlexBox/FlexBox";
import Wysiwyg, { WysiwygRef } from "components/Wysiwyg/Wysiwyg";
import usePreventLeave from "hooks/usePreventLeave";
import createStory from "lib/firebase/apis/createStory";
import editStory from "lib/firebase/apis/editStory";
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
          title: storyTitle,
          contentHTML: context.contentHTML,
        }).then(() => {
          setCanLeave(true);
          setTimeout(() => navigate(`/story/${originalStory.storyId}`), 50);
        });
      } else {
        setIsLoading(true);
        createStory({
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
      <FlexBox justifyContent="center">
        <Spin />
      </FlexBox>
    );
  }
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <FlexBox gap={10}>
        <Input
          value={storyTitle}
          onChange={({ target: { value } }) => setStoryTitle(value)}
          size="large"
          placeholder="제목을 입력하세요"
          maxLength={70}
        />
        <Button size="large" type="primary" onClick={handleSubmit}>
          {originalStory ? "수정" : "등록"}
        </Button>
      </FlexBox>
      <Wysiwyg defaultHTML={defaultHTML} ref={wysiwygRef} />
    </Space>
  );
}
