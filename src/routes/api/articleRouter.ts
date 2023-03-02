import { Router } from "express"
import { createArticle, deleteArticle, findAllArticle, findArticleById, updateArticle } from "../../controllers/articleController"

const routerArticle = Router()

routerArticle.route('/')
  .get(findAllArticle)
  .post(createArticle)

routerArticle.route('/:id')
  .get(findArticleById)
  .put(updateArticle)
  .delete(deleteArticle)

export default routerArticle
