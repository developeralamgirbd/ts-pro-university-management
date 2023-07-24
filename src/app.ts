import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
const app: Express = express();
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import { StatusCodes } from 'http-status-codes';
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1', routes);

app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully');
});

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  });
  next();
});

export default app;
