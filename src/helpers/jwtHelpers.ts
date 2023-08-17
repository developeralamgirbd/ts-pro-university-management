import jwt, { Secret } from 'jsonwebtoken';

const createToken = (
  payload: object,
  secret: Secret,
  expiresIn: string
): string => {
  return jwt.sign(payload, secret, { expiresIn: expiresIn });
};

export const jwtHelpers = {
  createToken,
};
