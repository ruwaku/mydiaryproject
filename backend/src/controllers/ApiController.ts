import { Response, Router } from "express";
import fbAuthAdmin from "lib/firebase/firebase";
import createUserWithKakao from "services/kakaoAuth/createUserWithKakao";
import fetchKakaoAuthToken from "services/kakaoAuth/fetchKakaoAuthToken";
import fetchKakaoUser from "services/kakaoAuth/fetchKakaoUser";
import getUserWithKakao from "services/kakaoAuth/getUserWithKakao";
import { ApiJSON } from "types/app";

const ApiController = Router();

const {
  KAKAO_CLIENT_ID,
  KAKAO_AUTH_REDIRECT_PATH,
  KAKAO_AUTH_COMPLETE_REDIRECT_PATH,
  BACKEND_HOST,
  FRONTEND_HOST,
} = process.env;
const url = new URL("https://kauth.kakao.com/oauth/authorize");
url.searchParams.append("response_type", "code");
url.searchParams.append("client_id", `${KAKAO_CLIENT_ID}`);
url.searchParams.append("redirect_uri", `${BACKEND_HOST}${KAKAO_AUTH_REDIRECT_PATH}`);

ApiController.get("/oauth/kakao", (req, res) => {
  res.redirect(url.toString());
});

ApiController.get("/oauth/kakao/callback", async (req, res: Response<ApiJSON>, next) => {
  try {
    const { code }: { code?: string } = req.query;
    if (!code) throw "잘못된 접근입니다";
    const tokenSet = await fetchKakaoAuthToken(code);
    const kakaoUser = await fetchKakaoUser(tokenSet.data.access_token);
    let user = await getUserWithKakao(kakaoUser.data);
    if (!user) {
      user = await createUserWithKakao(kakaoUser.data);
    }
    const customToken = await fbAuthAdmin.createCustomToken(user.uid, { oauth_provider: "kakao" });
    res.cookie("auth_hanging_token", customToken, {
      maxAge: 30 * 60 * 1000,
      path: "/",
      sameSite: "lax",
    });
    res.redirect(`${FRONTEND_HOST}${KAKAO_AUTH_COMPLETE_REDIRECT_PATH}`);
  } catch (error: any) {
    next(error);
  }
});

export default ApiController;
