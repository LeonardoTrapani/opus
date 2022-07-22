import express, {
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler,
} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//Routes
import authRoutes from './routes/auth';
import homeworkRoutes from './routes/homework';

import { ErrorResponse } from './models';

import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

//Configuring dotenv package to use env variables form .env
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json('test');
});

app.use(authRoutes);
app.use('/homework', homeworkRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const response: ErrorResponse = {
    message: 'Page not found',
    statusCode: 404,
  };
  res.status(response.statusCode).json(response);
});

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(err);
    res.status(500).json('An error has occurred');
  }
);

app.listen(process.env.PORT, () => {
  console.log('app listening on port ' + process.env.PORT);
});
