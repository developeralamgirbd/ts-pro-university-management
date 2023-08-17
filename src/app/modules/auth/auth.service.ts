import User from '../user/user.model';
import { ILoginUser } from './auth.interface';
import apiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
const loginUser = async (payload: ILoginUser) => {
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

  return {
    needsPasswordChange: isUserExit.needsPasswordChange,
    accessToken: 'access token',
  };
};

export const AuthService = {
  loginUser,
};
