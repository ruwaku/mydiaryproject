import { ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import uploadPersonalImage from "apis/uploadPersonalImage";
import { forwardRef, useImperativeHandle, useMemo } from "react";
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
    useImperativeHandle(ref, () => ({ contentHTML: defaultHTML }));
    const defaultContentState = useMemo(() => {
      if (defaultHTML) {
        const { contentBlocks, entityMap } = htmlToDraft(defaultHTML);
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        return convertToRaw(contentState);
      } else {
        return undefined;
      }
    }, [defaultHTML]);
    const handleImageUpload = async (file: File) => {
      const url = await uploadPersonalImage(file);
      return url ? { data: { link: url } } : false;
    };
    const handleContentStateChange = (value: RawDraftContentState) => {
      if (ref && typeof ref !== "function") {
        ref.current = { contentHTML: draftToHtml(value) };
      }
    };
    return (
      <Editor
        placeholder="내용을 입력하세요"
        locale="ko"
        onContentStateChange={handleContentStateChange}
        defaultContentState={defaultContentState}
        editorStyle={{ background: "#fff" }}
        toolbar={{
          image: { uploadCallback: handleImageUpload, previewImage: true },
        }}
        {...props}
      />
    );
  }
);

export default ForwardedWysiwyg;
