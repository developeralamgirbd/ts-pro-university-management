import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academisSemester.service';

const createAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    res.status(201).json({
      status: true,
      message: 'Academis semester created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AcademicSemesterController = { createAcademicSemester };
