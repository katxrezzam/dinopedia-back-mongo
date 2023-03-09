import { Router } from "express";
import handleLogout from "../controllers/logoutController";

const routerLogout = Router()

routerLogout.get('/', handleLogout)

export default routerLogout