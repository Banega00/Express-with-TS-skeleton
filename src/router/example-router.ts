import { ExampleController } from './../api/example-controller';
import { Router } from "express";

const router = Router()
const exampleController = new ExampleController()
router.get('/examplePath', exampleController.exampleMiddleware);


export const ExampleRouter = router;