import Result from "antd/es/result";
import Spin from "antd/es/spin";
import FlexBox from "components/FlexBox/FlexBox";
import StoryEditor from "components/StoryEditor/StoryEditor";
import fetchStory from "apis/fetchStory";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

export default function StoryEditorPage() {
  const [searchParams] = useSearchParams();
  const initialDate = useMemo(() => searchParams.get("date"), [searchParams]);
  const originalStoryId = useMemo(() => searchParams.get("id"), [searchParams]);
  const originalStoryQuery = useQuery(
    ["story", originalStoryId],
    () => (originalStoryId ? fetchStory({ storyId: originalStoryId }) : null),
    {
      refetchOnWindowFocus: false,
      enabled: !!originalStoryId,
    }
  );

  if (originalStoryId) {
    if (originalStoryQuery.isFetching)
      return (
        <FlexBox justifyContent="center" alignItems="center" style={{ padding: "3rem 0" }}>
          <Spin size="large" />
        </FlexBox>
      );
    if (originalStoryQuery.data) return <StoryEditor originalStory={originalStoryQuery.data} />;
    if (originalStoryQuery.isError)
      return <Result status="error" title="스토리를 찾을 수 없습니다" />;
  }
  return <StoryEditor initialDate={initialDate ? dayjs(initialDate) : undefined} />;
}
