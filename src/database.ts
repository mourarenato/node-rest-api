import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from '../ormconfig';
import {logInfo, logError} from './logger';

export const conn = (async () => {
    const connection = await createConnection(config);
    console.log(`PostgreSQL connected! 🐘`);
    //logInfo('PostgreSQL connected! ');

    //await conn.close();
    //console.log('PG connection closed.');
    
})().catch(error => logError(error));


