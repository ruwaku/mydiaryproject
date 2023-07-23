import { MenuProps } from "antd";
import Button from "antd/es/button";
import Divider from "antd/es/divider";
import Dropdown from "antd/es/dropdown";
import useModal from "antd/es/modal/useModal";
import Typography from "antd/es/typography";
import deleteStory from "apis/deleteStory";
import RemixIcon from "components/RemixIcon/RemixIcon";
import StoryTimestamp from "components/StoryTimestamp/StoryTimestamp";
import { useNavigate } from "react-router-dom";
import { StoryData } from "types/story";
import { useMemo } from "react";

interface Props {
  story: StoryData;
}
export default function StoryViewer({ story }: Props) {
  const [modal, contextHolder] = useModal();
  const navigate = useNavigate();
  const moreDropdownItems: MenuProps["items"] = [
    {
      key: 0,
      label: "수정하기",
      onClick: () => {
        navigate(`/story/editor?id=${story.storyId}`);
      },
    },
    {
      key: 1,
      label: "삭제하기",
      onClick: () => {
        const confirm = modal.confirm({
          title: "이 일기를 삭제할까요?",
          content: "삭제하면 복구할 수 없습니다",
          maskClosable: true,
          okButtonProps: { danger: true },
          onOk: () => {
            confirm.update({ okButtonProps: { loading: true }, maskClosable: false });
            deleteStory({ storyId: story.storyId }).then(confirm.destroy);
            navigate("/story");
          },
        });
      },
    },
  ];
  const contentHTML = useMemo(() => {
    const dom = new DOMParser().parseFromString(story.contentHTML, "text/html");
    Array.from(dom.getElementsByTagName("img")).forEach((img) => (img.style.maxWidth = "100%"));
    return dom.body.innerHTML;
  }, [story.contentHTML]);
  return (
    <div>
      {contextHolder}
      <Typography.Title level={2}>{story.title}</Typography.Title>
      <Typography.Paragraph>
        <StoryTimestamp storyDate={story.storyDate.toDate()} updatedAt={story.updatedAt.toDate()} />
      </Typography.Paragraph>
      <Dropdown
        trigger={["click"]}
        placement="bottomRight"
        menu={{
          items: moreDropdownItems,
        }}
      >
        <Button
          shape="circle"
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            height: "2rem",
            width: "2rem",
          }}
        >
          <RemixIcon name="more-2" suffix="fill" fontSize="1.25rem" />
        </Button>
      </Dropdown>
      <Divider />
      <Typography.Paragraph style={{ overflowX: "auto" }}>
        <div dangerouslySetInnerHTML={{ __html: contentHTML }} />
      </Typography.Paragraph>
    </div>
  );
}
