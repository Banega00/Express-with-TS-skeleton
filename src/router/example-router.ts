import { ExampleController } from './../api/example-controller';
import { Router } from "express";

const router = Router()

router.post('/user', ExampleController.insertNewUser)

export const ExampleRouter = router;