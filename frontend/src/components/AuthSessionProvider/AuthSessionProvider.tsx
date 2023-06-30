import { createContext } from "react";
import { useEffect, useState } from "react";
import { fbAuthClient } from "lib/firebase";
import { AuthSession } from "types/auth";

const defaultValue: AuthSession = { status: "pending" };
export const AuthSessionContext = createContext<AuthSession>(defaultValue);

export function AuthSessionProvider({ children }: React.PropsWithChildren) {
  const [authSession, setAuthSession] = useState<AuthSession>(defaultValue);
  useEffect(() => {
    fbAuthClient.onAuthStateChanged((currentUser) => {
      console.log("authState:", currentUser);
      if (currentUser) {
        setAuthSession({ status: "authenticated", current: currentUser });
      } else {
        setAuthSession({ status: "unauthenticated" });
      }
    });
  }, []);
  return <AuthSessionContext.Provider value={authSession}>{children}</AuthSessionContext.Provider>;
}
