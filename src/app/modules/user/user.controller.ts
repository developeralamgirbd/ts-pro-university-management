import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { role, password } = req.body;
    const user = { role, password };
    const result = await userService.createUser(user);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'user created successfully',
      data: result,
    });
    next();
  }
);

export const UserController = {
  createUser,
};
