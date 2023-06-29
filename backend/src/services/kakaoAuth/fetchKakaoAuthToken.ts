import axios from "axios";
import { KakaoToken } from "types/kakao";

const { BACKEND_HOST, KAKAO_AUTH_REDIRECT_PATH, KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET } =
  process.env;
export default async function fetchKakaoAuthToken(code: string) {
  const requestBody = {
    grant_type: "authorization_code",
    client_id: `${KAKAO_CLIENT_ID}`,
    redirect_uri: `${BACKEND_HOST}${KAKAO_AUTH_REDIRECT_PATH}`,
    client_secret: `${KAKAO_CLIENT_SECRET}`,
    code,
  };
  return axios.post<KakaoToken>("https://kauth.kakao.com/oauth/token", requestBody, {
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
}
