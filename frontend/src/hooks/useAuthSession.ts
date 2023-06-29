import { AuthSessionContext } from "components/AuthSessionProvider/AuthSessionProvider";
import { useContext } from "react";

export default function useAuthSession() {
  return useContext(AuthSessionContext);
}
