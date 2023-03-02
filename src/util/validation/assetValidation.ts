import { CreateAsset, UpdateAsset } from "../../types";
import { idSchemaValidation, stringValidation } from "./_validation";

export const toNewAsset = (object: any): CreateAsset => {
  const newAsset: CreateAsset = {
    url: stringValidation(object.url),
    section_id: idSchemaValidation(object.section_id)
  }
  return newAsset
}

export const toNewUpdateAsset = (object: any): UpdateAsset => {
  const asset: UpdateAsset = object
  if(asset.url) asset.url = stringValidation(object.url)
  if(asset.section_id) asset.section_id = idSchemaValidation(object.section_id)
  return asset
}