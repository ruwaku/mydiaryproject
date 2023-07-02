import { doc, getDoc } from "firebase/firestore";
import { fbAuthClient, fbFirestoreClient } from "../lib/firebase";
import { StoryData } from "types/story";
import { ApiError } from "types/error";

type Props = {
  storyId: string;
};

async function fetchStory({ storyId }: Props): Promise<StoryData | null> {
  const user = fbAuthClient.currentUser;
  if (!user) throw new ApiError("AUTH_NOT_LOGGED_IN");
  const result = await getDoc(doc(fbFirestoreClient, `/users/${user.uid}/stories/${storyId}`));
  if (result.exists()) {
    return { ...(result.data() as StoryData), storyId: result.id };
  } else {
    return null;
  }
}

export default fetchStory;
