import { useEffect } from "react";
import { unstable_usePrompt } from "react-router-dom";

export default function usePreventLeave(enabled: boolean) {
  unstable_usePrompt({
    when: enabled,
    message: "이 페이지에서 나가면 글이 저장되지 않습니다. 그래도 나가시겠습니까?",
  });
  const preventLeave = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
    return false;
  };
  useEffect(() => {
    const behavior = enabled ? window.addEventListener : window.removeEventListener;
    behavior("beforeunload", preventLeave);
    return () => window.removeEventListener("beforeunload", preventLeave);
  }, [enabled]);
}
