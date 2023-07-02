import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  QueryConstraint,
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { fbAuthClient, fbFirestoreClient } from "..";
import { StoryData } from "types/story";
dayjs.extend(utc);

type DateOrder = "최신순" | "오래된순";
type DateRange = [Dayjs, Dayjs];

export interface StoryListFilter {
  text?: string;
  orderBy?: DateOrder;
  dateRange?: DateRange;
  cursor?: number;
  itemCount?: number;
}
/**
 *
 * 스토리 목록 가져오기
 * @param filter 조건 필터
 */
export default async function fetchStories(filter: StoryListFilter): Promise<StoryData[]> {
  const user = fbAuthClient.currentUser;
  if (!user) throw user;

  const filterQueries: QueryConstraint[] = [];

  if (filter.dateRange?.[0])
    filterQueries.push(
      where("createdAt", ">=", Timestamp.fromDate(filter.dateRange[0].utc().toDate()))
    );
  if (filter.dateRange?.[1])
    filterQueries.push(
      where("createdAt", "<", Timestamp.fromDate(filter.dateRange[1].utc().add(1, "day").toDate()))
    );
  if (filter.orderBy)
    filterQueries.push(orderBy("createdAt", filter.orderBy === "최신순" ? "desc" : "asc"));

  console.log(filterQueries);
  const result = await getDocs(
    query(collection(fbFirestoreClient, `/users/${user.uid}/stories`), ...filterQueries)
  );

  if (result.empty) {
    return [];
  }
  return result.docs.map((doc) => ({ ...(doc.data() as StoryData), storyId: doc.id }));
}
