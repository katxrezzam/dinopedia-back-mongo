import { Schema, model } from 'mongoose'
import { Diet, Era, Kind } from '../enums'
import { ArticleAttributes } from './Article'

export interface DinosaurAttributes{
  _id: Schema.Types.ObjectId,
  name: string,
  kind: Kind,
  location: string,
  era: Era,
  diet: Diet,
  url_image: string,
  url_render: string,
  article_id: ArticleAttributes['_id']
}

export interface DinosaurInput extends Omit<DinosaurAttributes, '_id'> {}
export interface DinosaurOutput extends Required<DinosaurAttributes> {}

const DinosaurSchema = new Schema<DinosaurAttributes>({
  name: {
    type: String,
    required: true
  },
  kind: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
  },
  era: {
    type: String,
    required: true,
  },
  diet: {
    type: String,
    required: true,
  },
  url_image: {
    type: String,
    required: true
  },
  url_render: {
    type: String,
    required: true
  },
  article_id: {
    type: Schema.Types.ObjectId, ref: 'Article'
  }
})

export const Dinosaur = model('Dinosaur', DinosaurSchema)
