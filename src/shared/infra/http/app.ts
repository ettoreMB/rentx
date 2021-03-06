import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'
import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';

import '@shared/container';
import upload from '@config/upload';

import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import createConnection from '@shared/infra/typeorm';

import { AppError } from '@shared/errors/AppErrors';
import { router } from './routes';



createConnection()
const app = express();
app.use(express.json());

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));


app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(cors())
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    })

  }

  return res.status(500).json({
    message: `internal server Error - ${err.message}`,
  })

}
)

export { app }