import User from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import apiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  const user = new User();
  const isUserExit = await user.isUserExit(id);

  if (!isUserExit) {
    throw new apiError(
      StatusCodes.NOT_FOUND,
      'Login failed: Invalid credentials!'
    );
  }

  if (!isUserExit?.password) {
    throw new apiError(
      StatusCodes.UNAUTHORIZED,
      'Login failed: Invalid credentials!'
    );
  }

  const isMatchPassword = await user.isPasswordMatch(
    password,
    isUserExit?.password
  );

  if (!isMatchPassword) {
    throw new apiError(
      StatusCodes.UNAUTHORIZED,
      'Login failed: Invalid credentials!'
    );
  }

  const accessToken: string = jwtHelpers.createToken(
    { id: isUserExit?.id, role: isUserExit?.role },
    config?.jwt_secret as Secret,
    config.jwt_expires_in as string
  );
  const refreshToken: string = jwtHelpers.createToken(
    { id: isUserExit?.id, role: isUserExit?.role },
    config?.jwt_refresh_secret as Secret,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: isUserExit?.needsPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};
