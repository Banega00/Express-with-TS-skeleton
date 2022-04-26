import { json } from "body-parser";
import express from "express";
import * as router from "./router/router";
import { generateUniqueRequestId, Logger } from "./utils/logging/Logger";
import { validateRequestPayload } from "./utils/validation/validator";
import { sendInvalidMethodResponse } from "./utils/wrappers/response-wrapper";

const logger = new Logger('ROUTE')

const app: express.Application = express();

app.use(json({limit: "50mb", type: "application/json"}));

//Middleware for validating requests payload
app.use(generateUniqueRequestId)
app.use(logger.logExpressRoute)
app.use(validateRequestPayload);

//Set routers
app.use('/', router.ExampleRouter)
// app.use('/operation', routers.OperationsRouter);
// app.use('/internal', routers.InternalRouter);
// app.use('/report', routers.ReportsRouter);

app.use(sendInvalidMethodResponse);

export default app;