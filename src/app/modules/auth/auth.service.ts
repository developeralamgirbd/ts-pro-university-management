import User from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import apiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import ApiError from '../../../errors/ApiError';

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

const refreshToken = async (
  refresh_token: string
): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      refresh_token,
      config.jwt_refresh_secret as Secret
    );
  } catch (err) {
    throw new apiError(StatusCodes.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { id } = verifiedToken;

  const user = new User();

  const isUserExit = await user.isUserExit(id);

  if (!isUserExit) {
    throw new apiError(StatusCodes.NOT_FOUND, 'User does not exit!');
  }

  const accessToken = jwtHelpers.createToken(
    { id: isUserExit?.id, role: isUserExit?.role },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string
  );
  return {
    accessToken: accessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  // // checking is user exist
  // const isUserExist = await User.isUserExist(user?.userId);

  const userInstant = new User();

  //alternative way
  const isUserExist = await User.findOne({ id: user?.id }).select('+password');

  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await userInstant.isPasswordMatch(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Old Password is incorrect');
  }

  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;

  // updating using save()
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
