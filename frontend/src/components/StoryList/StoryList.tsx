import List from "antd/es/list";
import Skeleton from "antd/es/skeleton";
import Space from "antd/es/space";
import fetchStories, { StoryListFilter } from "lib/firebase/apis/fetchStories";
import { useQuery } from "react-query";
import { atom, useRecoilState } from "recoil";
import StoryListFilterControl from "./StoryListFilterControl";
import StoryListItem from "./StoryListItem";

const atom_filter = atom<StoryListFilter>({
  key: "storyListFilter",
  default: {},
});

export default function StoryList() {
  const [filter, setFilter] = useRecoilState<StoryListFilter>(atom_filter);
  const { data, isFetching } = useQuery(["storyList", filter], () => fetchStories(filter), {
    refetchOnWindowFocus: false,
  });
  return (
    <Space size="large" direction="vertical" style={{ width: "100%" }}>
      <StoryListFilterControl onChange={setFilter} />
      {isFetching && <Skeleton />}
      {!isFetching && data && (
        <List
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(story) => <StoryListItem story={story} />}
        />
      )}
    </Space>
  );
}
