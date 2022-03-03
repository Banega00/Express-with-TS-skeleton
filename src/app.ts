import { json } from "body-parser";
import express from "express";
import { configurePassport } from "./authorization/passport-configuration";
import * as router from "./router/router";
import { validateRequestPayload } from "./utils/validation/validator";
import { sendInvalidMethodResponse } from "./utils/wrappers/response-wrapper";
import passport from "passport";

const app: express.Application = express();

app.use(json({limit: "50mb", type: "application/json"}));

//Middleware for validating requests payload
app.use(validateRequestPayload);

configurePassport(app, passport);

//Set routers
app.use('/', router.ExampleRouter)
// app.use('/operation', routers.OperationsRouter);
// app.use('/internal', routers.InternalRouter);
// app.use('/report', routers.ReportsRouter);

app.use(sendInvalidMethodResponse);

export default app;