import express, { Express, Request, Response } from 'express';
import cors from 'cors';
const app: Express = express();
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1', routes);

app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully');
});

app.use(globalErrorHandler);
export default app;
