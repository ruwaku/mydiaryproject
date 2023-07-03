import Result from "antd/es/result";
import Skeleton from "antd/es/skeleton";
import fetchStory from "apis/fetchStory";
import StoryViewer from "components/StoryViewer/StoryViewer";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function StoryViewerPage() {
  const { storyId } = useParams();
  const { data, isFetching } = useQuery(
    ["story", storyId],
    () => fetchStory({ storyId: storyId! }),
    { enabled: !!storyId, refetchOnWindowFocus: false }
  );
  if (isFetching) return <Skeleton active />;
  if (data) {
    return <StoryViewer story={data} />;
  } else {
    return <Result status="error" title="스토리를 찾을 수 없습니다" />;
  }
}
