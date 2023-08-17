import { z } from 'zod';

const loginZodValidation = z.object({
  body: z.object({
    id: z.string({ required_error: 'ID is required!' }),
    password: z.string({ required_error: 'Password is required!' }),
  }),
});

const refreshTokenZodValidation = z.object({
  cookies: z.object({
    refresh_token: z.string({ required_error: 'Refresh token is required!' }),
  }),
});

export const AuthValidation = {
  loginZodValidation,
  refreshTokenZodValidation,
};
