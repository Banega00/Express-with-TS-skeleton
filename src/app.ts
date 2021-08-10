import { json } from "body-parser";
import * as express from "express";
import { validateRequestPayload } from "./utils/validation/validator";
import { sendInvalidMethodResponse } from "./utils/wrappers/response-wrapper";

const app: express.Application = express();

app.use(json({limit: "50mb", type: "application/json"}));

app.use(validateRequestPayload);

//Set routers
// app.use('/operation', routers.OperationsRouter);
// app.use('/internal', routers.InternalRouter);
// app.use('/report', routers.ReportsRouter);

app.use(sendInvalidMethodResponse);

export default app;