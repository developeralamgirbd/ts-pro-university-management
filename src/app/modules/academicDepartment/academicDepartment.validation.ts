import { z } from 'zod';

const createZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: `Title is required`,
    }),
    academicFaculty: z.string({
      required_error: `Academic faculty id is required`,
    }),
  }),
});

const updateZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createZodSchema,
  updateZodSchema,
};
