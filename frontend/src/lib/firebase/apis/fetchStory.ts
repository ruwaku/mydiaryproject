import { doc, getDoc } from "firebase/firestore";
import { fbAuthClient, fbFirestoreClient } from "..";
import { StoryData } from "types/story";

type Props = {
  storyId: string;
};

async function fetchStory({ storyId }: Props): Promise<StoryData | null> {
  const user = fbAuthClient.currentUser;
  if (!user) throw user;
  const result = await getDoc(doc(fbFirestoreClient, `/users/${user.uid}/stories/${storyId}`));
  if (result.exists()) {
    return { ...(result.data() as StoryData), storyId: result.id };
  } else {
    return null;
  }
}

export default fetchStory;
