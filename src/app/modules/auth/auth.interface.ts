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

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
