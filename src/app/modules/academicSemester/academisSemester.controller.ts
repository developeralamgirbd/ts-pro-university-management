import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academisSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../../shared/pick';
import { paginationFieds } from '../../../constants/pagination';
import { IAcademicSemister } from './academicSemester.interface';
import { filterableFields } from './academicSemester.constant';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse<IAcademicSemister>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academis semester created successfully',
      data: result,
    });
    next();
  }
);

const getAllAcademicSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, filterableFields);
    const paginationOptions = pick(req.query, paginationFieds);

    const result = await AcademicSemesterService.getAllSemesters(
      filters,
      paginationOptions
    );
    sendResponse<IAcademicSemister[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester retrived successfully !',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await AcademicSemesterService.getSingleSemester(id);

    sendResponse<IAcademicSemister>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester retrived successfully !',
      data: result,
    });
    next();
  }
);

const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await AcademicSemesterService.updateSemester(
      id,
      updatedData
    );
    sendResponse<IAcademicSemister>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academis semester updated successfully',
      data: result,
    });
    next();
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleSemester,
  updateAcademicSemester,
};
