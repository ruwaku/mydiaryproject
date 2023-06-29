import { NextFunction, Request, Response } from "express";
import { ApiError, ApiJSON } from "types/app";
import { AxiosError } from "axios";

export default function ErrorController(
  error: any,
  req: Request,
  res: Response<ApiJSON>,
  next: NextFunction
) {
  console.error("ErrorController catch:", error?.message);
  let errorBody: ApiError;
  if (
    error instanceof AxiosError &&
    error.config?.url?.includes("kakao.com") &&
    error.response?.data
  ) {
    errorBody = {
      display: `카카오 로그인 실패 (${error.response.data.error_code}), 잠시 후 다시 시도해 보세요`,
      debug: error.response.data,
    };
  } else {
    errorBody = {
      display: `요청을 처리할 수 없습니다. 잠시 후 다시 시도해 보세요`,
      debug: error,
    };
  }
  res.json({ ok: false, error: errorBody });
}
