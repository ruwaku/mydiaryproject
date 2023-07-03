import Button from "antd/es/button";
import Result from "antd/es/result";
import Spin from "antd/es/spin";
import logout from "apis/logout";
import FlexBox from "components/FlexBox/FlexBox";
import LoginFallback from "components/LoginFallback/LoginFallback";
import useAuthSession from "hooks/useAuthSession";

interface Props {
  element: React.ReactNode;
}
export default function WithAuthSession({ element }: Props) {
  const authSession = useAuthSession();
  switch (authSession.status) {
    case "pending":
      return (
        <FlexBox justifyContent="center" alignItems="center" style={{ padding: "3rem 0" }}>
          <Spin size="large" />
        </FlexBox>
      );
    case "unauthenticated":
      return <LoginFallback />;
    case "authenticated":
      return <>{element}</>;
    default:
      return (
        <Result
          status="error"
          title="로그인 정보를 확인할 수 없습니다"
          subTitle="잠시 후 다시 시도하거나 로그아웃해 보세요"
          extra={<Button onClick={logout}>로그아웃</Button>}
        />
      );
  }
}
