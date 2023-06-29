import fbAuthAdmin from "lib/firebase/firebase";
import { KakaoUser } from "types/kakao";

export default function getUserWithKakao(kakaoUser: KakaoUser) {
  return fbAuthAdmin.getUser(`kakao_${kakaoUser.id}`);
}
