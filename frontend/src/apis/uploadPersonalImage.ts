import { ref as fbStorageRef, getDownloadURL, uploadBytes } from "firebase/storage";
import { fbAuthClient, fbStorageClient } from "lib/firebase";
import { v4 as UUIDv4 } from "uuid";

export default async function uploadPersonalImage(file: File) {
  const user = fbAuthClient.currentUser;
  if (!user) return false;
  const dist = fbStorageRef(fbStorageClient, `/personal/${user.uid}/${UUIDv4()}__${file.name}`);
  const result = await uploadBytes(dist, file);
  if (!result?.ref) return false;
  const url = await getDownloadURL(result.ref);
  return url;
}
