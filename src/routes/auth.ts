import { Router } from "express";
import handleLogin from "../controllers/authController";

const routerAuth = Router()

routerAuth.post('/', handleLogin)

export default routerAuth