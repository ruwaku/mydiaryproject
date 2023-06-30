import { doc, getDoc } from "firebase/firestore";
import { fbAuthClient, fbFirestoreClient } from "..";

interface Props {
  storyId: string;
}
export default async function fetchStory({ storyId }: Props) {
  const user = fbAuthClient.currentUser;
  if (!user) throw user;
  return await getDoc(doc(fbFirestoreClient, `/users/${user.uid}/stories/${storyId}`));
}
