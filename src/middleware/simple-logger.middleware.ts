import { BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export function simpleFunc(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization !== process.env.API_KEY) {
        const errPayload = new BadRequestException('Forbidden access');
        next(errPayload)
    } else {
        next();
    }
} 