import { ContentBlock, ContentState, convertToRaw } from "draft-js";
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
        customBlockRenderFunc={(contentBlock) => {
          // 한국어/중국어 입력하면 오류 나는 문제 해결
          // https://github.com/jpuri/react-draft-wysiwyg/issues/979#issuecomment-672142998
          const type = contentBlock.getType();
          if (type === "atomic") {
            return {
              component: MediaComponent,
              editable: false,
              props: {
                foo: "bar",
              },
            };
          }
        }}
        editorStyle={{ background: "#fff" }}
        toolbar={{
          image: { uploadCallback: handleImageUpload, previewImage: true },
        }}
        {...props}
      />
    );
  }
);

interface MediaComponentProps {
  block: ContentBlock;
  contentState: ContentState;
}
function MediaComponent({ block, contentState }: MediaComponentProps) {
  const data = contentState.getEntity(block.getEntityAt(0)).getData();
  const hackHTML = " "; // 1 space
  return (
    <div>
      {hackHTML}
      <img
        src={data.src}
        alt={data.alt || ""}
        style={{ height: data.height || "auto", width: data.width || "auto" }}
      />
    </div>
  );
}

export default ForwardedWysiwyg;
