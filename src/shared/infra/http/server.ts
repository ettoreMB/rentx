import express, { Request, Response, NextFunction} from 'express';

import 'express-async-errors';
import 'reflect-metadata';
import '@shared/infra/typeorm';
import '@shared/container';

import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';

import { AppError } from '@shared/errors/AppErrors';
import { router } from './routes';



const app  = express();
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message
      })

    }

    return res.status(500).json({
      message: `internal server Error - ${err.message}`,
    })
  
  }
)

app.listen(3333 , () => {
  console.log('server is Running on Port 3333');
})