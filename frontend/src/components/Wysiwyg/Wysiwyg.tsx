import { ContentState, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import uploadPersonalImage from "lib/firebase/apis/uploadPersonalImage";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { Editor, EditorProps, RawDraftContentState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export interface WysiwygRef {
  contentHTML?: string | null;
}
interface WysiwygProps {
  defaultHTML?: string;
}

const ForwardedWysiwyg = forwardRef<WysiwygRef, EditorProps & WysiwygProps>(
  ({ defaultHTML, ...props }, ref) => {
    const [contentState, setContentState] = useState<RawDraftContentState>();
    const defaultEditorState = useMemo(() => {
      if (defaultHTML) {
        const { contentBlocks, entityMap } = htmlToDraft(defaultHTML);
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        return editorState;
      }
      return null;
    }, [defaultHTML]);
    const handleImageUpload = async (file: File) => {
      const url = await uploadPersonalImage(file);
      return url ? { data: { link: url } } : false;
    };
    const handleContentStateChange = () => {
      if (ref && typeof ref !== "function") {
        ref.current = { contentHTML: contentState ? draftToHtml(contentState) : null };
      }
    };
    useEffect(handleContentStateChange, [contentState, ref]);
    return (
      <Editor
        placeholder="내용을 입력하세요"
        locale="ko"
        onContentStateChange={setContentState}
        {...(defaultEditorState ? { defaultEditorState: defaultEditorState } : {})}
        toolbar={{
          image: { uploadCallback: handleImageUpload, previewImage: true },
        }}
        {...props}
      />
    );
  }
);

export default ForwardedWysiwyg;
