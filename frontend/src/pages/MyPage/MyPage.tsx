import Button from "antd/es/button";
import LoginFallback from "components/LoginFallback/LoginFallback";
import useAuthSession from "hooks/useAuthSession";
import logout from "apis/logout";

export default function MyPage() {
  const authSession = useAuthSession();
  return (
    <div>
      {authSession.status === "authenticated" ? (
        <Button onClick={logout}>로그아웃</Button>
      ) : (
        <LoginFallback />
      )}
    </div>
  );
}
