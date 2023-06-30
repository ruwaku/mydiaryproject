import { addDoc, collection, doc } from "firebase/firestore";
import { fbAuthClient, fbFirestoreClient } from "..";

interface Props {
  title: string;
  contentHTML: string;
}
/**
 * 스토리 등록
 * @param title 제목
 * @param contentHTML 내용 HTML
 * @returns 생성된 스토리 아이디
 */
export default async function createStory({ title, contentHTML }: Props) {
  const user = fbAuthClient.currentUser;
  if (!user) throw user;
  const result = await addDoc(collection(fbFirestoreClient, `/users/${user.uid}/stories`), {
    title,
    contentHTML,
  });
  return result.id;
}
