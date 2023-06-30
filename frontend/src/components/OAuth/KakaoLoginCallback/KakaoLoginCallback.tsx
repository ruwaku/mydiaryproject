import Button from "antd/es/button";
import Result from "antd/es/result";
import Spin from "antd/es/spin";
import FlexBox from "components/FlexBox/FlexBox";
import { browserLocalPersistence, setPersistence, signInWithCustomToken } from "firebase/auth";
import { fbAuthClient } from "lib/firebase";
import useCookieValue from "hooks/useCookieValue";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function KakaoLoginCallback({ ...props }) {
  const navigate = useNavigate();
  const customToken = useCookieValue("auth_hanging_token");
  useEffect(() => {
    if (customToken) {
      setPersistence(fbAuthClient, browserLocalPersistence).then(() => {
        signInWithCustomToken(fbAuthClient, customToken).then(() => {
          console.log("로그인 성공");
          navigate(sessionStorage.getItem("auth_redirect_url") ?? process.env.REACT_APP_HOST!, {
            replace: true,
          });
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customToken]);
  return (
    <FlexBox justifyContent="center" alignItems="center" style={{ height: "100%" }}>
      {customToken ? (
        <Spin size="large" />
      ) : (
        <Result
          status="warning"
          title="카카오 로그인 실패"
          subTitle="장시간 조작이 없었으므로 보안을 위해 처음부터 다시 로그인해 주세요."
          extra={<Button href="/">처음 화면으로</Button>}
        />
      )}
    </FlexBox>
  );
}
