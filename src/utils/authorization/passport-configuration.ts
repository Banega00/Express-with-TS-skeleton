import { NextFunction } from 'express';
import { ErrorStatusCode, SuccessStatusCode } from './../status-codes';
import { User, UserRepository } from "../../repository/user-repository";
import {Strategy as LocalStrategy} from 'passport-local'
import { sendResponse } from '../wrappers/response-wrapper';
import { Application, Request, Response } from 'express';
import ExpressSession from 'express-session';
import { PassportStatic } from 'passport';

//1. Setup Strategy - determines how is login request handled
//2. Setup Express-session, and initialize passport and passport session
//3. Define serializeUser and deserializeUser
//4. Define login route - and call passport.authenticate
//5. Make checkAuthenticated middleware that check if user is logged in
export const configurePassport = (app:Application, passport: PassportStatic) => {
    
    //1. Setting Local Strategy
    passport.use(new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        //username and password are default credentials fomr LocalStrategy
        function(username, password, done) {
    
          const user = UserRepository.getInstance().findByUsername(username);
    
          if(!user) return done(null, false, {message: "Invalid username"});
          if(user.password != password){
            return done(null, false, {message: "Invalid password"});
          } 
    
          return done(null, user);
        }
    ));

    //2. Express-session config
    app.use(ExpressSession({ 
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }));

    //Passport initialization has to be after Express-session initialization
    app.use(passport.initialize());
    app.use(passport.session());
    

    //3.
    //TODO
    passport.serializeUser(function(user:any, done:Function) {
        done(null, user.id);
    });
    
    //TODO
    passport.deserializeUser(function(id:number, done:Function) {
        try{
            const user = UserRepository.getInstance().findById(id);
            done(null, user);
        }catch(error){
            done(error, null);
        }
    });

    //4.
    //login route - calling custom callbaback
    app.post('/login', (request:Request, response:Response, next) =>{
        passport.authenticate('local', (error:any, user: User, info:any) =>{
          if(error) return sendResponse(response, 401, ErrorStatusCode.Failure, error); //if server error occured
          if(!user) return sendResponse(response, 401, ErrorStatusCode.Failure, info); //custom message
          else {

            //Because of custom callback we have responsibility to establish an express-session by calling request.login
            request.logIn(user, function(error) {
                if (error) return sendResponse(response, 401, ErrorStatusCode.Failure, error); 
                return sendResponse(response, 200, SuccessStatusCode.Success); 
              });
          }
        })(request,response,next);//IIFE - immediately invoked function expression
    })
}

//5.
export const checkAuthenticated = (request: Request, response: Response, next: NextFunction) => {
    if (request.isAuthenticated()) { return next() }
    return sendResponse(response, 401, ErrorStatusCode.Unauthorized);
}