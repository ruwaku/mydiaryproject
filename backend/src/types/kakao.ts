export interface KakaoUser {
  id: Long;
  kakao_account?: KakaoUserAccount;
}

export interface KakaoUserAccount {
  name?: string;
  email?: string;
  is_email_valid?: boolean;
  is_email_verified?: boolean;
  profile?: KakaoUserProfile;
}

export interface KakaoUserProfile {
  nickname: string;
  profile_image_url: string;
}

export interface KakaoToken {
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_token_expires_in: number;
  id_token?: string;
  scope?: string;
}
