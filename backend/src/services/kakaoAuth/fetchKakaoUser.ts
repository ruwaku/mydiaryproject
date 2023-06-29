import axios from "axios";
import { KakaoUser } from "types/kakao";

export default async function fetchKakaoUser(accessToken: string) {
  return axios.post<KakaoUser>("https://kapi.kakao.com/v2/user/me", null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
}
