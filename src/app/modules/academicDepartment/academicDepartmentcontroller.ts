import { Request, Response } from 'express';
import { AcademicDepartmentService } from './academicDepartment.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../../shared/pick';
import { paginationFieds } from '../../../constants/pagination';
import { IAcademicDepartment } from './academicDepartment.interface';
import { filterableFields } from './academicDepartment.constant';

const createOne = catchAsync(async (req: Request, res: Response) => {
  const { ...createdData } = req.body;
  const result = await AcademicDepartmentService.createOneService(createdData);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Department created successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterableFields);
  const paginationOptions = pick(req.query, paginationFieds);

  const result = await AcademicDepartmentService.getAllService(
    filters,
    paginationOptions
  );
  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Department retrived successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicDepartmentService.getSingleService(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty retrived successfully !',
    data: result,
  });
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AcademicDepartmentService.updateOneService(
    id,
    updatedData
  );
  sendResponse<IAcademicDepartment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic faculty updated successfully',
    data: result,
  });
});

const removeOne = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.removeOneService(id);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic faculty deleted successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createOne,
  getAll,
  getSingle,
  updateOne,
  removeOne,
};
