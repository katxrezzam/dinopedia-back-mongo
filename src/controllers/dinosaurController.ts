import { RequestHandler } from "express";
import { create, destroy, findAll, findById, update } from "../services/dinosaurServices";
import { errorMessage, errorJson } from "../util/errorLogger";
import { toNewDinosaur, toNewUpdateDinosaur } from "../util/validation/dinosaurValidation";
import { bufferValidation, idSchemaValidation } from "../util/validation/_validation";
import { UpdateDinosaur } from '../types'
import { uploadBlob } from "../services/blobServices";

const container = 'dinosaurs'
const BLOB_URI = 'https://dinopediablob.blob.core.windows.net/dinosaurs/'

export const findAllDinosaur: RequestHandler = async (_req, res) => {
  try {
    const dinos = await findAll()
    res.json(dinos)
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
}

export const createDinosaur: RequestHandler = async (req, res) => {
  try{
    const newDino = toNewDinosaur(req.body)

    const { buffer, originalname } = req.file as Express.Multer.File

    const wordsplited = originalname.split('.')

    const fileExtension = wordsplited[1]

    const parsedBuffer = bufferValidation(buffer)

    const parsedDino = await create(newDino)

    const fileName = `${parsedDino._id}.${fileExtension}`

    await uploadBlob(parsedBuffer, fileName, container)

    parsedDino.url_image = BLOB_URI+fileName
    parsedDino.url_render = BLOB_URI+fileName

    await update(parsedDino._id, parsedDino)
    
    res.json(parsedDino)
  } catch(error){
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
}

export const findDinosaurById: RequestHandler = async (req, res) => {
  try {
    const id = idSchemaValidation(req.params.id)
    const dino = await findById(id)
    res.json(dino)
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
}

export const updateDinosaur: RequestHandler = async (req, res) => {
  try {
    const id = idSchemaValidation(req.params.id)
    const dino: UpdateDinosaur = toNewUpdateDinosaur(req.body)
    const parsedDino = await update(id, dino)
    res.json(parsedDino)
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
}

export const deleteDinosaur: RequestHandler = async (req, res) => {
  try {
    const id = idSchemaValidation(req.params.id)
    const isDeleted = await destroy(id)
    res.json(isDeleted)
  } catch (error) {
    res.status(400).json(errorMessage(error))
    console.error(errorMessage(error))
  }
}