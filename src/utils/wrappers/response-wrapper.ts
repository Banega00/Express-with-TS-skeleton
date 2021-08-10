import { Request, Response } from "express";

export function sendResponse(res: Response, status: number, payload?: any): void {
    res.status(status).json({ status, payload });
}

export function sendInvalidMethodResponse(_: Request, response: Response): void {
    response.status(405).send();
}