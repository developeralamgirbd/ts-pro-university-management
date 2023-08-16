import { Request, Response } from 'express';
import { userService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await userService.createStudent(student, userData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'student created successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body;
  const result = await userService.createFaculty(faculty, userData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'faculty created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userData } = req.body;
  const result = await userService.createAdmin(admin, userData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'admin created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin
};
