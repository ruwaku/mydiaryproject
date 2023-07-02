import Button from "antd/es/button";
import DatePicker from "antd/es/date-picker";
import Segmented from "antd/es/segmented";
import FlexBox from "components/FlexBox/FlexBox";
import { StoryListFilter } from "lib/firebase/apis/fetchStories";
import { useEffect, useMemo, useReducer } from "react";
import debounce from "utils/debounce";

type ReducerActions =
  | { type: "dateRange"; payload: StoryListFilter["dateRange"] }
  | { type: "orderBy"; payload: StoryListFilter["orderBy"] }
  | { type: "RESET" };

const reducer = (state: StoryListFilter, action: ReducerActions): StoryListFilter => {
  switch (action.type) {
    case "dateRange":
    case "orderBy":
      return { ...state, [action.type]: action.payload };
    case "RESET":
      return { orderBy: "최신순" };
    default:
      return state;
  }
};

interface Props {
  onChange: (filter: StoryListFilter) => void;
}
export default function StoryListFilterControl({ onChange }: Props) {
  const debounceDelay = 0;
  const onChangeDebounced = useMemo(() => debounce(onChange, debounceDelay), [onChange]);
  const [filter, updateFilter] = useReducer(reducer, {});
  useEffect(() => {
    console.log(filter);
    onChangeDebounced?.(filter);
  }, [filter, onChangeDebounced]);
  return (
    <FlexBox gap={10}>
      <Segmented
        value={filter.orderBy}
        onChange={(value) =>
          updateFilter({ type: "orderBy", payload: value as StoryListFilter["orderBy"] })
        }
        options={["최신순", "오래된순"]}
      />
      <DatePicker.RangePicker
        placeholder={["작성 날짜 범위", "작성 날짜 범위"]}
        value={filter.dateRange}
        onChange={(value) =>
          updateFilter({ type: "dateRange", payload: value as StoryListFilter["dateRange"] })
        }
        allowClear
        allowEmpty={[true, true]}
        style={{ flexShrink: 0 }}
      />
      <Button onClick={() => updateFilter({ type: "RESET" })}>초기화</Button>
    </FlexBox>
  );
}
