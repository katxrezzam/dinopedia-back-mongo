import { Router } from "express";
import { createDinosaur, updateDinosaur, findAllDinosaur, findDinosaurById, deleteDinosaur } from "../../controllers/dinosaurController";


const routerDinosaur = Router()

routerDinosaur.route('/')
  .get(findAllDinosaur)
  .post(createDinosaur)

routerDinosaur.route('/:id')
  .put(updateDinosaur)
  .get(findDinosaurById)
  .delete(deleteDinosaur)

export default routerDinosaur