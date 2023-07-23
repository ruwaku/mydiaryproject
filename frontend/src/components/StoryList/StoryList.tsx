import Affix from "antd/es/affix";
import Button from "antd/es/button";
import List from "antd/es/list";
import Skeleton from "antd/es/skeleton";
import Space from "antd/es/space";
import theme from "antd/es/theme";
import Typography from "antd/es/typography";
import fetchStories, { StoryListFilter } from "apis/fetchStories";
import RemixIcon from "components/RemixIcon/RemixIcon";
import { useMemo, useState } from "react";
import { InView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { atom, useRecoilState } from "recoil";
import StoryListFilterControl from "./StoryListFilterControl";
import StoryListItem from "./StoryListItem";

const atom_filter = atom<StoryListFilter>({
  key: "storyListFilter",
  default: {},
});
const pageSize: number = 10;

export default function StoryList() {
  const { token: antdToken } = theme.useToken();
  const [filter, setFilter] = useRecoilState<StoryListFilter>(atom_filter);
  const [total, setTotal] = useState<number>(0);
  const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery(
    ["storyList", filter],
    ({ pageParam }) => fetchStories(filter, { pageSize, lastDoc: pageParam?.lastDoc }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.results.length > 0)
          return { pageNo: pages.length, lastDoc: lastPage?.lastDoc };
      },
      onSuccess: (data) => {
        const total = data.pages.at(-1)?.total;
        if (total) setTotal(total);
      },
    }
  );
  const isPageEnded = useMemo(() => data && data.pages.length * pageSize >= total, [total, data]);
  return (
    <Space size="large" direction="vertical" style={{ width: "100%" }}>
      <StoryListFilterControl onChange={setFilter} />
      {data?.pages && (
        <List
          dataSource={data.pages}
          itemLayout="vertical"
          renderItem={(page, i) => {
            if (page.results.length > 0) {
              return (
                <List.Item>
                  <Affix offsetTop={0}>
                    <div
                      style={{
                        background: antdToken.colorBgContainer,
                        padding: "0.5rem",
                        borderBottom: `1px solid ${antdToken.colorBorderSecondary}`,
                      }}
                    >
                      Page {i + 1}
                    </div>
                  </Affix>
                  <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={page?.results}
                    renderItem={(story) => <StoryListItem story={story} />}
                  />
                </List.Item>
              );
            } else {
              return null;
            }
          }}
        />
      )}
      {isLoading || isFetching ? (
        <Skeleton />
      ) : isPageEnded ? (
        <Typography.Paragraph type="secondary" style={{ textAlign: "center" }}>
          더이상 없습니다
        </Typography.Paragraph>
      ) : (
        <InView
          threshold={1}
          rootMargin="0px 100% -20px 100%"
          onChange={(inView) => inView && fetchNextPage()}
        >
          <Button
            type="dashed"
            onClick={() => fetchNextPage()}
            style={{ width: "100%", height: "auto", padding: "0.5rem" }}
          >
            Load More
            <RemixIcon name="arrow-down-s" />
          </Button>
        </InView>
      )}
    </Space>
  );
}
