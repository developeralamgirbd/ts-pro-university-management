import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import {
  academicSemesterTitleCodeMapper,
  searchableFields,
} from './academicSemester.constant';
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
  const { search, ...filtersData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      $or: searchableFields.map(field => ({
        [field]: { $regex: search, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: Record<string, 1 | -1> = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder as 1 | -1;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemister.aggregate([
    { $match: whereConditions },
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

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemister | null> => {
  return AcademicSemister.findById(id);
};

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemister>
) => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid semester code!');
  }
  return AcademicSemister.findOneAndUpdate({ _id: id }, payload, { new: true });
};
const deleteSemester = async (
  id: string
): Promise<IAcademicSemister | null> => {
  return AcademicSemister.findByIdAndDelete({ _id: id });
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
