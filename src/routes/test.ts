import { Router } from "express";
import { handleTest } from "../controllers/testController";
import { upload } from "../lib/multerConfig";

const routerTest = Router()

routerTest.post('/', upload.array('files'),handleTest)

export default routerTest