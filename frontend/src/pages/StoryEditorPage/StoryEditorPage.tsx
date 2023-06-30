import StoryEditor from "components/StoryEditor/StoryEditor";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function StoryEditorPage() {
  const [searchParams] = useSearchParams();
  const storyId = useMemo(() => searchParams.get("id"), [searchParams]);
  return <StoryEditor originalStoryId={storyId ?? undefined} />;
}
