import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  QueryConstraint,
  QueryDocumentSnapshot,
  Timestamp,
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { ApiError } from "types/error";
import { StoryData } from "types/story";
import { fbAuthClient, fbFirestoreClient } from "../lib/firebase";
dayjs.extend(utc);

type DateOrder = "최신순" | "오래된순";
type DateRange = [Dayjs, Dayjs];

export interface StoryListFilter {
  text?: string;
  orderBy?: DateOrder;
  dateRange?: DateRange;
}
interface PaginationListData<T = any> {
  results: T;
  total: number;
  lastDoc: QueryDocumentSnapshot<any>;
}
/** 스토리 목록 가져오기 */
export default async function fetchStories(
  filter: StoryListFilter,
  pagination?: { lastDoc?: PaginationListData["lastDoc"]; pageSize: number }
): Promise<PaginationListData<StoryData[]>> {
  const user = fbAuthClient.currentUser;
  if (!user) throw new ApiError("AUTH_NOT_LOGGED_IN");

  const filterQueries: QueryConstraint[] = [];

  if (filter.dateRange?.[0])
    filterQueries.push(
      where("storyDate", ">=", Timestamp.fromDate(filter.dateRange[0].utc().toDate()))
    );
  if (filter.dateRange?.[1])
    filterQueries.push(
      where("storyDate", "<", Timestamp.fromDate(filter.dateRange[1].utc().add(1, "day").toDate()))
    );
  if (filter.orderBy)
    filterQueries.push(orderBy("storyDate", filter.orderBy === "최신순" ? "desc" : "asc"));
  if (pagination) {
    if (pagination.lastDoc) filterQueries.push(startAfter(pagination.lastDoc));
    if (pagination.pageSize) filterQueries.push(limit(pagination.pageSize));
  }

  const stories = collection(fbFirestoreClient, `/users/${user.uid}/stories`);
  const data = await getDocs(query(stories, ...filterQueries));
  const storiesTotal = (await getCountFromServer(stories)).data().count;

  return {
    results: data.empty
      ? []
      : data.docs.map((doc) => ({ ...(doc.data() as StoryData), storyId: doc.id })),
    total: storiesTotal,
    lastDoc: data.docs[data.docs.length - 1],
  };
}
