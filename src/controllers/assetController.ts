import { RequestHandler } from "express"
import { create, destroy, findAll, findById, findBySection, update } from "../services/assetServices"
import { UpdateAsset } from "../types"
import { errorJson, errorMessage } from "../util/errorLogger"
import { toNewAsset, toNewUpdateAsset } from "../util/validation/assetValidation"
import { idSchemaValidation } from "../util/validation/_validation"

export const findAllAsset: RequestHandler = async (_req, res) => {
  try {
    const assets = await findAll()
    res.json(assets)
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
}

export const findAssetById: RequestHandler = async (req, res) => {
  try {
    const id = idSchemaValidation(req.params.id)
    const asset = await findById(id)
    res.json(asset)
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
}

export const findAssetBySection: RequestHandler = async (req, res) => {
  try {
    const id = idSchemaValidation(req.params.id)
    const asset = await findBySection(id)
    res.json(asset)
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
}

export const createAsset: RequestHandler = async (req, res) => {
  try {
    const newAsset = toNewAsset(req.body)
    const parsedAsset = await create(newAsset)
    res.json(parsedAsset)
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
}

export const updateAsset: RequestHandler = async (req, res) => {
  try {
    const id = idSchemaValidation(req.params.id)
    const asset: UpdateAsset = toNewUpdateAsset(req.body)
    const parsedAsset = await update(id, asset)
    res.json(parsedAsset)
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
}

export const deleteAsset: RequestHandler = async (req, res) => {
  try {
    const id = idSchemaValidation(req.params.id)
    const isDeleted = await destroy(id)
    res.json(isDeleted)
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
}