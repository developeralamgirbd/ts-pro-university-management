import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academisSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academis semester created successfully',
      data: result,
    });
    next();
  }
);

export const AcademicSemesterController = { createAcademicSemester };
