import { IStudent } from '../student/student.interface';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import User from './user.model';
import { ENUM_USER_ROLE } from '../../../enums/user';
import AcademicSemister from '../academicSemester/academicSemester.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import mongoose from 'mongoose';
import Student from '../student/student.model';
import AcademicFaculty from '../academicFaculty/academicFaculty.model';
import AcademicDepartment from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import { IFaculty } from '../faculty/faculty.interface';
import { studentDBQueries } from '../student/studentDBQueries';
import { facultyDBQueries } from '../faculty/faculty.dbQueries';
import { ManagementDepartment } from '../managementDepartment/managementDepartment.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { adminDbQueries } from '../admin/admin.dbQueries';
export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined;
};
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty?.id?.substring(2) : undefined;
};

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastAdmin?.id ? lastAdmin?.id?.substring(2) : undefined;
};

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  user.role = ENUM_USER_ROLE.STUDENT;

  const academicSemester = await AcademicSemister.findById(
    student.academicSemester
  ).lean();

  const academicFaculty = await AcademicFaculty.findById(
    student.academicFaculty
  ).lean();

  const academicDepartment = await AcademicDepartment.findById(
    student.academicDepartment
  ).lean();

  if (!academicSemester) {
    throw new ApiError(400, 'Academic semester not exits!');
  }
  if (!academicFaculty) {
    throw new ApiError(400, 'Academic faculty not exits!');
  }
  if (!academicDepartment) {
    throw new ApiError(400, 'Academic department not exits!');
  }

  let newUserData = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    const createdStudent = await Student.create([student], { session });

    if (!createdStudent.length) {
      throw new ApiError(400, 'Failed to create student');
    }

    user.student = createdStudent[0]?._id;

    const createdUser = await User.create([user], { session });
    if (!createdUser.length) {
      throw new ApiError(400, 'Failed to create user');
    }

    newUserData = createdUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserData) {
    newUserData = await User.aggregate([
      {
        $match: { id: newUserData.id },
      },
      { $lookup: studentDBQueries.studentJoiningStageOne },
      { $unwind: '$student' },
      { $lookup: studentDBQueries.academicSemesterJoiningStageOne },
      { $unwind: '$academicSemester' },
      { $lookup: studentDBQueries.academicFacultyJoiningStageOne },
      { $unwind: '$academicFaculty' },
      { $lookup: studentDBQueries.departmentJoiningStageOne },
      { $unwind: '$academicDepartment' },
    ]);
  }
  delete newUserData[0].password;
  return newUserData[0];
};

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  user.role = ENUM_USER_ROLE.FACULTY;

  const academicFaculty = await AcademicFaculty.findById(
    faculty.academicFaculty
  ).lean();

  const academicDepartment = await AcademicDepartment.findById(
    faculty.academicDepartment
  ).lean();

  if (!academicFaculty) {
    throw new ApiError(400, 'Academic faculty not exits!');
  }
  if (!academicDepartment) {
    throw new ApiError(400, 'Academic department not exits!');
  }

  let newUserData = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    const createdFaculty = await Faculty.create([faculty], { session });

    if (!createdFaculty.length) {
      throw new ApiError(400, 'Failed to create faculty');
    }

    user.faculty = createdFaculty[0]?._id;

    const createdUser = await User.create([user], { session });
    if (!createdUser.length) {
      throw new ApiError(400, 'Failed to create user');
    }

    newUserData = createdUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserData) {
    newUserData = await User.aggregate([
      {
        $match: { id: newUserData.id },
      },
      { $lookup: facultyDBQueries.facultyJoiningStageOne },
      { $unwind: '$faculty' },
      { $lookup: facultyDBQueries.academicFacultyJoiningStageOne },
      { $unwind: '$academicFaculty' },
      { $lookup: facultyDBQueries.departmentJoiningStageOne },
      { $unwind: '$academicDepartment' },
    ]);
  }
  delete newUserData[0].password;
  return newUserData[0];
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  user.role = ENUM_USER_ROLE.ADMIN;

  const managementDepartment = await ManagementDepartment.findById(
    admin.managementDepartment
  ).lean();

  if (!managementDepartment) {
    throw new ApiError(400, 'management department not exits!');
  }

  let newUserData = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const createdAdmin = await Admin.create([admin], { session });

    if (!createdAdmin.length) {
      throw new ApiError(400, 'Failed to create admin');
    }

    user.admin = createdAdmin[0]?._id;

    const createdUser = await User.create([user], { session });
    if (!createdUser.length) {
      throw new ApiError(400, 'Failed to create user');
    }

    newUserData = createdUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserData) {
    newUserData = await User.aggregate([
      {
        $match: { id: newUserData.id },
      },
      { $lookup: adminDbQueries.adminJoining },
      { $unwind: '$admin' },
      { $lookup: adminDbQueries.managementDepartmentJoining },
      { $unwind: '$managementDepartment' },
    ]);
  }
  delete newUserData[0].password;
  return newUserData[0];
};

export const userService = {
  createStudent,
  createFaculty,
  createAdmin,
};
