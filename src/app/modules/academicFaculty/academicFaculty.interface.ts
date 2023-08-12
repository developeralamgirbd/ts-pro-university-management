import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
};

export type IAcademicFacultyFilter = {
  search: string;
};

export type AcademicFacultyModel = Model<IAcademicFaculty>;
