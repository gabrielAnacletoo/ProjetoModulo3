import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { DatabaseConfig } from './Database/Database';
import { routes } from './Routers';

dotenv.config();

const initializeApp = async () => {
  await DatabaseConfig.initialize();

  const app = express();
  app.use(cors({ origin: '*' }));
  app.use(express.json());
  app.use(routes);

  return app;
};

export { initializeApp };
