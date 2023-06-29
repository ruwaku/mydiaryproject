import { useLocation } from "react-router-dom";

export default function KakaoLoginButton({ ...props }) {
  const { pathname } = useLocation();
  return (
    <a
      onClick={() => {
        sessionStorage.setItem("auth_redirect_url", pathname);
      }}
      href={`${process.env.REACT_APP_BACKEND_HOST}/api/oauth/kakao`}
    >
      <button
        aria-label="카카오 계정으로 로그인"
        type="button"
        style={{
          cursor: "pointer",
          backgroundImage: "url(/resource/kakao_login_medium_wide.png)",
          backgroundRepeat: "no-repeat",
          display: "block",
          width: 300,
          height: 45,
          border: "none",
          borderRadius: 12,
        }}
        {...props}
      ></button>
    </a>
  );
}
