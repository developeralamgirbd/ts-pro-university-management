import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../user/user.interface';
import { StatusCodes } from 'http-status-codes';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);

  sendResponse<IUser>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
