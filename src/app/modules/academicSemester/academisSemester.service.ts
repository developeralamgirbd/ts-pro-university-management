import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import {
  IAcademicSemesterFilter,
  IAcademicSemister,
} from './academicSemester.interface';
import AcademicSemister from './academicSemester.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';

const createSemester = async (
  payload: IAcademicSemister
): Promise<IAcademicSemister> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid semester code!');
  }

  const result = await AcademicSemister.create(payload);
  return result;
};

const getAllSemesters = async (
  filters: IAcademicSemesterFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const { search } = filters;
  const searchableFields = ['title', 'code', 'year'];
  const andConditions = [];

  if (search) {
    andConditions.push({
      $or: searchableFields.map(field => ({
        [field]: { $regex: search, $options: 'i' },
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: Record<string, 1 | -1> = {}; // Adjust the type here

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder as 1 | -1; // Make sure to cast sortOrder to 1 | -1
  }

  const result = await AcademicSemister.aggregate([
    { $match: { $and: andConditions } },
    { $sort: sortCondition }, // Use the sortCondition variable here
    { $skip: skip },
    { $limit: limit },
  ]);

  // const result = await AcademicSemister.find().sort().skip(skip).limit(limit);

  const total = await AcademicSemister.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = { createSemester, getAllSemesters };
