import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import {logInfo, logError, logApi} from '../logger';

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query.API_KEY) return res.status(401).json('Acess denied');
        const token = req.query.API_KEY;

        const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload;
        req.userId = payload._id;

        next();

    } catch(e) {
        logError(e);
        return res.status(401).json('Token invalid');
    }
}