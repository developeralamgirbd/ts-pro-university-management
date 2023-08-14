import { Request, Response } from 'express';
import { AcademicFacultyService } from './academicFaculty.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../../shared/pick';
import { paginationFieds } from '../../../constants/pagination';
import { IAcademicFaculty } from './academicFaculty.interface';
import { filterableFields } from './academicFaculty.constant';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );

  sendResponse<IAcademicFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academis faculty created successfully',
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, filterableFields);
    const paginationOptions = pick(req.query, paginationFieds);

    const result = await AcademicFacultyService.getAllFaculties(
      filters,
      paginationOptions
    );
    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Faculty retrived successfully !',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyService.getSingleFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty retrived successfully !',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await AcademicFacultyService.updateFaculty(id, updatedData);
    sendResponse<IAcademicFaculty>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic faculty updated successfully',
      data: result,
    });
  }
);

const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.deleteFaculty(id);
    sendResponse<IAcademicFaculty>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic faculty deleted successfully',
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createFaculty,
  getAllAcademicFaculties,
  getSingleFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
