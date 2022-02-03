import { IUser, User } from './../models/user.model';
import { UserRepository } from './../repository/user.repository';
import { NextFunction, Response, Request } from "express";
import { SuccessStatusCode } from "../utils/status-codes";
import { sendResponse } from "../utils/wrappers/response-wrapper";

export class UserController{
    public static async insertNewUser(request: Request, response:Response, next:NextFunction): Promise<any>{
        const userData:IUser = request.body;
        const user = new User(userData);
        await user.hashPassword();
        UserRepository.insert(user);
        sendResponse(response, 200, SuccessStatusCode.Success);
    }
}