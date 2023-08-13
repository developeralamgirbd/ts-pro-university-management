import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';

const handleDuplicateError = (err: mongoose.mongo.MongoServerError) => {
  const errors: IGenericErrorMessage[] = [];
  if (err.codeName === 'DuplicateKey') {
    errors.push({
      path: Object.keys(err.keyPattern)[0],
      message: `updated ${Object.keys(err.keyPattern)[0]} already exists!`,
    });
  }

  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate Key Error',
    errorMessages: errors,
  };
};

export default handleDuplicateError;
