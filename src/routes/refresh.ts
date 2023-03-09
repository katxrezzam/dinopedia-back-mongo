import { Router } from "express";
import handleRefreshToken from "../controllers/refreshTokenController";

const routerRefresh = Router()

routerRefresh.get('/', handleRefreshToken)

export default routerRefresh