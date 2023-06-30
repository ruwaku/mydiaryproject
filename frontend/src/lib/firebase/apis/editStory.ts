import { doc, updateDoc } from "firebase/firestore";
import { fbAuthClient, fbFirestoreClient } from "..";

interface Props {
  storyId: string;
  title: string;
  contentHTML: string;
}
export default async function editStory({ storyId, title, contentHTML }: Props) {
  const user = fbAuthClient.currentUser;
  if (!user) throw user;
  return await updateDoc(doc(fbFirestoreClient, `/users/${user.uid}/stories/${storyId}`), {
    title,
    contentHTML,
  });
}
