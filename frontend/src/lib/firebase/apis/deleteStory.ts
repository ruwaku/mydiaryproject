import { deleteDoc, doc } from "firebase/firestore";
import { fbAuthClient, fbFirestoreClient } from "..";

interface Parameter {
  storyId: string;
}
/**
 * 스토리 삭제
 * @param storyId 삭제할 스토리 아이디
 */
export default async function deleteStory({ storyId }: Parameter) {
  const user = fbAuthClient.currentUser;
  if (!user) throw user;
  await deleteDoc(doc(fbFirestoreClient, `/users/${user.uid}/stories/${storyId}`));
  return;
}
