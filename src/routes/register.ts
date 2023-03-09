import { Router } from "express";
import handleNewUser from "../controllers/registerController";

const routerRegister = Router()

routerRegister.post('/', handleNewUser)

export default routerRegister