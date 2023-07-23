import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { fbAuthClient, fbFirestoreClient } from "../lib/firebase";
import { StoryData } from "types/story";
import { ApiError } from "types/error";

interface Props {
  storyId: StoryData["storyId"];
  storyDate: StoryData["storyDate"];
  title: StoryData["title"];
  contentHTML: StoryData["contentHTML"];
}
/** 스토리 수정 */
export default async function editStory({ storyId, storyDate, title, contentHTML }: Props) {
  const user = fbAuthClient.currentUser;
  if (!user) throw new ApiError("AUTH_NOT_LOGGED_IN");
  const currentDate = serverTimestamp();
  await updateDoc(doc(fbFirestoreClient, `/users/${user.uid}/stories/${storyId}`), {
    title,
    contentHTML,
    storyDate,
    updatedAt: currentDate,
  });
  return;
}
