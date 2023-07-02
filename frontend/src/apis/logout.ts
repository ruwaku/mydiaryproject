import { fbAuthClient } from "lib/firebase";

export default function logout() {
  return fbAuthClient.signOut();
}
