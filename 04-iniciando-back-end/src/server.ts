import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import chalk from 'chalk';

import uploadConfig from './config/upload';
import AppError from './errors/AppError';
import Database from './database';
import router from './routes';

const database = new Database();
database
  .connect()
  .then(connection => {
    if (!connection.isConnected) {
      throw new Error('Something wrong happened with connection.');
    }

    // eslint-disable-next-line
    console.log(chalk.bold.cyanBright(' ✔ Database is connected!'));

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use('/files', express.static(uploadConfig.directory));
    app.use(router);

    app.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }

        // eslint-disable-next-line
        console.error(err);

        return response.status(500).json({
          status: 'error',
          message: 'Internal server error.',
        });
      },
    );

    app.listen(3333, () => {
      // eslint-disable-next-line
      console.log(chalk.bold.greenBright('🚀 Server started on port 3333!'));
    });
  })
  .catch(error => {
    throw new Error(error);
  });
