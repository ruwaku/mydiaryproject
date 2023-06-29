import fbAuthAdmin from "lib/firebase/firebase";
import { UserId } from "types/firebase";
import { KakaoUser } from "types/kakao";

export default function createUserWithKakao(kakaoUser: KakaoUser) {
  const uid: UserId = `kakao_${kakaoUser.id}`;
  return fbAuthAdmin.createUser({
    uid,
    displayName: kakaoUser.kakao_account?.profile?.nickname,
    email: kakaoUser.kakao_account?.email,
    emailVerified: kakaoUser.kakao_account?.is_email_verified,
    photoURL: kakaoUser.kakao_account?.profile?.profile_image_url,
  });
}
