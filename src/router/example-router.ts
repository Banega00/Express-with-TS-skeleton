import { UserController } from './../api/user.controller';
import { Router } from "express";

const router = Router()

router.post('/user', UserController.insertNewUser)

export const ExampleRouter = router;