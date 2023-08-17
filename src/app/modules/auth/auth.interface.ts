export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginUserResponse = {
  needsPasswordChange: boolean | undefined;
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
