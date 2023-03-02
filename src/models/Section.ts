import { Schema, model } from "mongoose";
import { ArticleAttributes } from "./Article";

interface SectionAttributes{
    _id: Schema.Types.ObjectId
    title: string,
    content: string,
    article_id: ArticleAttributes['_id']
}
export interface SectionInput extends Omit<SectionAttributes, '_id'> {}
export interface SectionOutput extends Required<SectionAttributes> {}

const SectionSchema = new Schema<SectionAttributes>({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    article_id: {
        type: Schema.Types.ObjectId, ref: 'Article'
    }
})

const Section = model<SectionAttributes>('Section', SectionSchema)

export {Section, SectionAttributes}