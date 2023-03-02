import { Schema, model } from 'mongoose'

interface ArticleAttributes {
  _id: Schema.Types.ObjectId
  title: string
}
export interface ArticleInput extends Omit<ArticleAttributes, '_id'> { }
export interface ArticleOutput extends Required<ArticleAttributes> { }

const ArticleSchema = new Schema<ArticleAttributes>({
  title: {
    type: String,
    required: true
  }
})
const Article = model<ArticleAttributes>('Article', ArticleSchema)

export { Article, ArticleAttributes }
