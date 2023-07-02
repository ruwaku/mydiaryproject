import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { fbAuthClient, fbFirestoreClient } from "../lib/firebase";
import { StoryData } from "types/story";
import { ApiError } from "types/error";

interface Props {
  title: StoryData["title"];
  contentHTML: StoryData["contentHTML"];
}
/**
 * 스토리 생성
 * @returns 생성된 스토리 아이디
 */
export default async function createStory({ title, contentHTML }: Props) {
  const user = fbAuthClient.currentUser;
  if (!user) throw new ApiError("AUTH_NOT_LOGGED_IN");
  const currentDate = serverTimestamp();
  const result = await addDoc(collection(fbFirestoreClient, `/users/${user.uid}/stories`), {
    title,
    contentHTML,
    createdAt: currentDate,
    updatedAt: currentDate,
  });
  return result.id;
}
