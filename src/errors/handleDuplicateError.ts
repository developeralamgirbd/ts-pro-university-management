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

  const statusCode = err.codeName === 'DuplicateKey' ? 400 : 500;
  return {
    statusCode,
    message:
      err.codeName === 'DuplicateKey'
        ? 'Duplicate Key Error'
        : 'Something went wrong!',
    errorMessages: errors,
  };
};

export default handleDuplicateError;
