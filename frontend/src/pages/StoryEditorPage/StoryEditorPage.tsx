import { useEffect } from "react";
import { unstable_usePrompt } from "react-router-dom";

function usePreventLeave() {
  unstable_usePrompt({
    when: true,
    message: "이 페이지에서 나가면 글이 저장되지 않습니다. 그래도 나가시겠습니까?",
  });
  const preventLeave = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
    return false;
  };
  useEffect(() => {
    window.addEventListener("beforeunload", preventLeave);
    return () => window.removeEventListener("beforeunload", preventLeave);
  });
}

export default function StoryEditorPage() {
  usePreventLeave();
  return <div>StoryEditorPage</div>;
}
