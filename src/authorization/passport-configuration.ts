import { Application, NextFunction, Request, Response } from "express";
import { PassportStatic } from 'passport';
import { ErrorStatusCode, SuccessStatusCode } from "../utils/status-codes";
import { sendResponse } from "../utils/wrappers/response-wrapper";
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import { User, UserRepository } from "../repository/user-repository";
import ExpressSession from 'express-session';


export const configurePassport = (app:Application, passport: PassportStatic) => {
    passport.use(new GoogleStrategy({
        clientID:     "937599167400-56lf87r1topp1upgtauns3gpbi02mqt5.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:3000/google-oauth-cb",
        passReqToCallback   : true
      },

      function(request, accessToken, refreshToken, profile, done) {
        const email = profile.emails?.[0]?.value
        if(!email) throw new Error("INVALID EMAIL")

        const user:User = {email: email, id:+profile.id, name: profile.displayName}
        UserRepository.getInstance().findByIdOrCreate(user);

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

    passport.serializeUser(function(user:any, done:Function) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id:number, done:Function) {
        try{
            const user = UserRepository.getInstance().findById(id);
            done(null, user);
        }catch(error){ 
            done(error, null);
        }
    });

    app.get('/login/google', (request:Request, response:Response, next) =>{
      passport.authenticate('google', {
        scope: ['email','profile']
      })(request,response,next);//IIFE - immediately invoked function expression
    })

    //This is called when user choose login profile
    //here only code from URL is available
    app.get('/google-oauth-cb', passport.authenticate('google', {
      successRedirect: '/dashboard',
      failureRedirect: '/failure',
    }))

    app.get('/dashboard', (request:Request, response:Response) =>{
      console.log(request.session)
      return sendResponse(response, 200, SuccessStatusCode.Success)
    })
  // (error:any, user: User, info:any) =>{
  //   if(error) return sendResponse(response, 401, ErrorStatusCode.Failure, error); //if server error occured
  //   if(!user) return sendResponse(response, 401, ErrorStatusCode.Failure, info); //custom message
  //   else {

  //     //Because of custom callback we have responsibility to establish an express-session by calling request.login
  //     request.logIn(user, function(error) {
  //         if (error) return sendResponse(response, 401, ErrorStatusCode.Failure, error); 
  //         return sendResponse(response, 200, SuccessStatusCode.Success); 
  //       });
  //   }
  // }
}
export const checkAuthenticated = (request: Request, response: Response, next: NextFunction) => {
    if (request.isAuthenticated()) { return next() }
    return sendResponse(response, 401, ErrorStatusCode.Unauthorized);
}

