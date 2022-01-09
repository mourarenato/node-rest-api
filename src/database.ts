import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from '../ormconfig';
import { logError } from './logger';

export const conn = (async () => {
  await createConnection(config);
  // eslint-disable-next-line no-console
  console.log(`PostgreSQL connected! 🐘`);
})().catch((error) => logError(error));
