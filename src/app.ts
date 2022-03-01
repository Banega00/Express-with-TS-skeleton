import { checkAuthenticated, configurePassport } from './utils/authorization/passport-configuration';
import { json } from "body-parser";
import express, {Application, Request, Response} from "express";
import passport from "passport";
import * as router from "./router/router";
import { validateRequestPayload } from "./utils/validation/validator";
import { sendInvalidMethodResponse, sendResponse } from "./utils/wrappers/response-wrapper";
import { SuccessStatusCode } from './utils/status-codes';

const app: Application = express();

app.use(json({limit: "50mb", type: "application/json"}));

//Middleware for validating requests payload
app.use(validateRequestPayload);

//Configure passport
configurePassport(app, passport);

app.use('/test', (request: Request, response: Response) =>{
    console.log(request.session)
    sendResponse(response, 200, SuccessStatusCode.Success);
})

//Set routers
app.use('/', router.ExampleRouter)
// app.use('/operation', routers.OperationsRouter);
// app.use('/internal', routers.InternalRouter);
// app.use('/report', routers.ReportsRouter);

app.use(sendInvalidMethodResponse);

export default app;