import { Schema, model } from "mongoose";
import { SectionAttributes } from "./Section";

interface AssetAttributes{
    _id: Schema.Types.ObjectId
    url: string,
    section_id: SectionAttributes['_id']
}

export interface AssetInput extends Omit<AssetAttributes, '_id'> {}
export interface AssetOutput extends Required<AssetAttributes> {}

const AssetSchema = new Schema<AssetAttributes>({
    url: {
        type: String,
        required: true        
    },
    section_id: {
        type: Schema.Types.ObjectId, ref: 'Section'
    }
})

const Asset = model<AssetAttributes>('Asset', AssetSchema)

export {Asset, AssetAttributes}