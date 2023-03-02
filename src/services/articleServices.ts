import { Schema } from "mongoose";
import { Article, ArticleInput, ArticleOutput } from "../models/Article";

export const create = async (article: ArticleInput): Promise<ArticleOutput> => {
  return await Article.create(article)
}

export const findAll = async (): Promise<ArticleOutput[]> => {
 return await Article.find() 
}

export const findById = async (id: Schema.Types.ObjectId): Promise<ArticleOutput> => {
  const article = await Article.findById(id)
  if(!article) throw new Error('Not article found')
  return article
}

export const update = async (id: Schema.Types.ObjectId, article: Partial<ArticleInput>): Promise<ArticleOutput> => {
  const foundArticle = await Article.findById(id)
  if(!foundArticle) throw new Error('Not article found')
  const {title} = article
  if(title) foundArticle.title = title
  return await foundArticle.save()
}

export const destroy = async (id: Schema.Types.ObjectId): Promise<boolean> => {
  const article = await Article.findById(id)
  if(!article) throw new Error('Not article found')
  const result = await Article.deleteOne({_id: id})
  return !!result
}
