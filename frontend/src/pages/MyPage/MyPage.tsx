import Button from "antd/es/button";
import LoginFallback from "components/LoginFallback/LoginFallback";
import { fbAuthClient } from "lib/firebase";
import useAuthSession from "hooks/useAuthSession";

export default function MyPage() {
  const authSession = useAuthSession();
  return (
    <div>
      {authSession.status === "authenticated" ? (
        <Button
          onClick={() => {
            fbAuthClient.signOut();
          }}
        >
          로그아웃
        </Button>
      ) : (
        <LoginFallback />
      )}
    </div>
  );
}
