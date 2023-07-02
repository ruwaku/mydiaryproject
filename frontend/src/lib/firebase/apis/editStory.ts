import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { fbAuthClient, fbFirestoreClient } from "..";
import { StoryData } from "types/story";

interface Props {
  storyId: StoryData["storyId"];
  title: StoryData["title"];
  contentHTML: StoryData["contentHTML"];
}
/** 스토리 수정 */
export default async function editStory({ storyId, title, contentHTML }: Props) {
  const user = fbAuthClient.currentUser;
  if (!user) throw user;
  const currentDate = serverTimestamp();
  await updateDoc(doc(fbFirestoreClient, `/users/${user.uid}/stories/${storyId}`), {
    title,
    contentHTML,
    updatedAt: currentDate,
  });
  return;
}
