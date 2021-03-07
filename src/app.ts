import express, { Application } from 'express'; 
import morgan from 'morgan';
import "reflect-metadata";
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
dotenv.config();

const app: Application = express(); 

// settings 
const PORT = process.env.DEFAULT_PORT;
const HOST = '10.10.0.22';

app.set('port', PORT);
app.set('host', HOST);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);

export default app;
