import { deleteDoc, doc } from "firebase/firestore";
import { fbAuthClient, fbFirestoreClient } from "../lib/firebase";
import { ApiError } from "types/error";

interface Parameter {
  storyId: string;
}
/**
 * 스토리 삭제
 * @param storyId 삭제할 스토리 아이디
 */
export default async function deleteStory({ storyId }: Parameter) {
  const user = fbAuthClient.currentUser;
  if (!user) throw new ApiError("AUTH_NOT_LOGGED_IN");
  await deleteDoc(doc(fbFirestoreClient, `/users/${user.uid}/stories/${storyId}`));
  return;
}
