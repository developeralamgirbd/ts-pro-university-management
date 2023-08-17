import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { ILoginUserResponse } from './auth.interface';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;
  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refresh_token', refreshToken, cookieOption);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login successfully',
    data: others,
  });
});

export const AuthController = {
  loginUser,
};
