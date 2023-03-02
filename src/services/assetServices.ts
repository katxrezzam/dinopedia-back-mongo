import { Schema } from "mongoose"
import { Asset, AssetInput, AssetOutput } from "../models/Asset"

export const findAll = async (): Promise<AssetOutput[]> => {
  return await Asset.find()
}

export const findById = async (id: Schema.Types.ObjectId): Promise<AssetOutput> => {
  const asset = await Asset.findById(id)
  if(!asset) throw new Error('Not asset found')
  return asset
}

export const findBySection = async (section_id: Schema.Types.ObjectId): Promise<AssetOutput[]> => {
  return await Asset.find({ section_id })
}

export const create = async (asset: AssetInput): Promise<AssetOutput> => {
  return await Asset.create(asset)
}

export const destroy = async (id: Schema.Types.ObjectId): Promise<boolean> => {
  const asset = await Asset.findById(id)
  if(!asset) throw new Error('Not asset found')
  const result = await Asset.deleteOne({ _id: id })
  return !!result
}

export const update = async (id: Schema.Types.ObjectId, asset: Partial<AssetInput>): Promise<AssetOutput> => {
  const foundAsset = await Asset.findById(id)
  if(!foundAsset) throw new Error('Not asset found')
  
  const { url,section_id } = asset
  if(url) foundAsset.url = url
  if(section_id) foundAsset.section_id = section_id
  return await foundAsset.save()
}