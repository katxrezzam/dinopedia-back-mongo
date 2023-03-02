import { CreateArticle, UpdateArticle } from "../../types";
import { stringValidation } from "./_validation";

export const toNewArticle = (objet: any): CreateArticle => {
  const newArticle: CreateArticle = {
    title: stringValidation(objet.title)
  }
  return newArticle
}

export const toNewUpdateArticle = (object: any): UpdateArticle => {
  const article: UpdateArticle = object
  if(article.title) article.title = stringValidation(article.title)
  return article
 }