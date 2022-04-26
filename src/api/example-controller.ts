//API folder contains controllers which handles requests

import { Request, Response, NextFunction } from "express";
import { Logger } from "../utils/logging/Logger";
import { SuccessStatusCode } from "../utils/status-codes";
import { sendResponse } from "../utils/wrappers/response-wrapper";

export class ExampleController{
    private logger = new Logger('ExampleController')
    public exampleMiddleware = async (request: Request, response:Response, next:NextFunction): Promise<any> => {
        this.logger.log({level: 'debug', response, data:'PORUKA'} )
        sendResponse(response, 200, SuccessStatusCode.Success, {test:{test2:'testtt'}});
    }
}