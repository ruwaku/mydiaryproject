import Button from "antd/es/button";
import Input from "antd/es/input";
import Result from "antd/es/result";
import Space from "antd/es/space";
import Spin from "antd/es/spin";
import FlexBox from "components/FlexBox/FlexBox";
import Wysiwyg, { WysiwygRef } from "components/Wysiwyg/Wysiwyg";
import usePreventLeave from "hooks/usePreventLeave";
import createStory from "lib/firebase/apis/createStory";
import editStory from "lib/firebase/apis/editStory";
import fetchStory from "lib/firebase/apis/fetchStory";
import { useRef, useState } from "react";
import { useMutation, useQuery, useIsMutating } from "react-query";
import { useNavigate } from "react-router-dom";

interface Props {
  originalStoryId?: string;
}

export default function StoryEditor({ originalStoryId }: Props) {
  const navigate = useNavigate();
  const isEditMode = Boolean(originalStoryId);
  const [canLeave, setCanLeave] = useState(true);
  const [storyTitle, setStoryTitle] = useState<string>();
  const [defaultHTML, setDefaultHTML] = useState<string>();
  const editStoryMutation = useMutation(editStory);
  const createStoryMutation = useMutation(createStory);
  const isMutating = useIsMutating(["story"]);
  const originalStoryQuery = useQuery(
    ["story", originalStoryId],
    () => (originalStoryId ? fetchStory({ storyId: originalStoryId }) : null),
    {
      refetchOnWindowFocus: false,
      enabled: isEditMode,
      onSuccess: (data) => {
        if (data?.exists()) {
          setCanLeave(false);
          const { title, contentHTML } = data?.data();
          setStoryTitle(title);
          setDefaultHTML(contentHTML);
        }
      },
    }
  );
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
      if (isEditMode && originalStoryId) {
        editStoryMutation.mutate(
          {
            storyId: originalStoryId,
            title: storyTitle,
            contentHTML: context.contentHTML,
          },
          {
            onSuccess: () => {
              setCanLeave(true);
              setTimeout(() => navigate(`/story/${originalStoryId}`), 100);
            },
          }
        );
      } else {
        createStoryMutation.mutate(
          { title: storyTitle, contentHTML: context.contentHTML },
          {
            onSuccess: (newStoryId) => {
              setCanLeave(true);
              setTimeout(() => navigate(`/story/${newStoryId}`), 100);
            },
          }
        );
      }
    }
  };
  if (originalStoryQuery.isFetching || isMutating)
    return (
      <FlexBox justifyContent="center">
        <Spin />
      </FlexBox>
    );
  if (originalStoryQuery.data?.exists() || !isEditMode) {
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
            {originalStoryId ? "수정" : "등록"}
          </Button>
        </FlexBox>
        <Wysiwyg defaultHTML={defaultHTML} ref={wysiwygRef} />
      </Space>
    );
  } else {
    return <Result status="error" title="존재하지 않는 스토리 ID" />;
  }
}
