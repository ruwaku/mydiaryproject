const ApiErrorMessageMap = {
  AUTH_NOT_LOGGED_IN: "로그인하지 않았습니다",
} as const;

export class ApiError {
  constructor(public errorKey: keyof typeof ApiErrorMessageMap, public payload?: any) {}
  public message: string = ApiErrorMessageMap[this.errorKey];
}
