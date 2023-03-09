import { RequestHandler } from "express";
import { create, destroy, findAll, findById, update } from "../services/dinosaurServices";
import { errorMessage, errorJson } from "../util/errorLogger";
import { toNewDinosaur, toNewUpdateDinosaur } from "../util/validation/dinosaurValidation";
import { bufferValidation, idSchemaValidation, stringValidation } from "../util/validation/_validation";
import { UpdateDinosaur } from '../types'
import { uploadBlob } from "../services/blobServices";

const container = 'dinosaurs'

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

    const parsedBuffer = bufferValidation(buffer)

    const parsedFileName = stringValidation(originalname)

    await uploadBlob(parsedBuffer, parsedFileName, container)

    const parsedDino = await create(newDino)
    
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