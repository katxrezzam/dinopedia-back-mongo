import { Router } from "express";
import { createDinosaur, updateDinosaur, findAllDinosaur, findDinosaurById, deleteDinosaur } from "../../controllers/dinosaurController";
import { upload } from "../../lib/multerConfig";

const routerDinosaur = Router()

routerDinosaur.route('/')
  .get(findAllDinosaur)
  .post(upload.array('files') ,createDinosaur)

routerDinosaur.route('/:id')
  .put(upload.single('file') ,updateDinosaur)
  .get(findDinosaurById)
  .delete(deleteDinosaur)

export default routerDinosaur