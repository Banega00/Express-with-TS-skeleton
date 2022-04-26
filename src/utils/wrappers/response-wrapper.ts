import { SuccessStatusCode, ErrorStatusCode } from './../status-codes';
import { Request, Response } from "express";
import { getDescription } from "../status-codes";
import { Logger } from '../logging/Logger';

const logger = new Logger('End of request');

export function sendResponse(res: Response, status: number, statusCode: SuccessStatusCode | ErrorStatusCode, payload?: any): void {
    const message = getDescription(statusCode);
    logger.log({level:'debug', response: res, data: { status, statusCode, message, payload}})
    res.status(status).json({ 
        status,
        statusCode,
        message, 
        payload,
    });
}

export function sendInvalidMethodResponse(_: Request, response: Response): void {
    response.status(405).send();
}