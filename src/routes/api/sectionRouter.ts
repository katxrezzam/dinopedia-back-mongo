import { Router } from "express";
import { createSection, deleteSection, findAllSection, findSectionByArticle, findSectionByid, updateSection } from "../../controllers/sectionController";

const routerSection = Router()

routerSection.route('/')
  .get(findAllSection)
  .post(createSection)

routerSection.route('/:id')
  .get(findSectionByid)
  .put(updateSection)
  .delete(deleteSection)

routerSection.route('/article/:id')
  .get(findSectionByArticle)

export default routerSection
