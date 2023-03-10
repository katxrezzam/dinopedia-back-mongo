import { RequestHandler } from "express";
import { create, destroy, findAll, findById, update } from "../services/dinosaurServices";
import { errorMessage, errorJson } from "../util/errorLogger";
import { toNewDinosaur, toNewUpdateDinosaur } from "../util/validation/dinosaurValidation";
import { idSchemaValidation } from "../util/validation/_validation";
import { UpdateDinosaur } from '../types'
import { uploadBlob } from "../services/blobServices";
import { toNewFiles } from "../util/validation/filesValidation";

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
  try {
    //
    const newDino = toNewDinosaur(req.body)
    const parsedDino = await create(newDino)
    //
    const files = toNewFiles(req.files)
    let fileNames: string[] = []
    files.map( async (file: any) => {
      let fileExtension = file.originalname.split('.')[1]
      let fileName = `${parsedDino._id}.${fileExtension}`
      fileNames.push(fileName)
      await uploadBlob(file.buffer, fileName, container)
    })
    parsedDino.url_image = BLOB_URI + fileNames[0]
    parsedDino.url_render =  BLOB_URI + fileNames[1]
    const result = await update(parsedDino._id, parsedDino)
    res.json(result)
  } catch (error) {
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