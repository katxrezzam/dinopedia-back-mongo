import { RequestHandler } from "express";
import { create, destroy, findAll, findByArticle, findById, update } from "../services/sectionServices";
import { errorJson, errorMessage } from "../util/errorLogger";
import { toNewSection, toNewUpdateSection } from "../util/validation/sectionValidation";
import { idSchemaValidation } from "../util/validation/_validation";

export const findAllSection: RequestHandler = async (_req, res) => {
  try {
    const sections = await findAll()
    res.json(sections)
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
}

export const findSectionByid: RequestHandler = async (req, res) => {
  try {
    const id = idSchemaValidation(req.params.id)
    const section = await findById(id)
    res.json(section)
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
}

export const findSectionByArticle: RequestHandler = async (req, res) => {
  try {
    const id = idSchemaValidation(req.params.id)
    const sections = await findByArticle(id)
    res.json(sections)
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
}

export const createSection: RequestHandler = async (req, res) => {
  try {
    const newSection = toNewSection(req.body)
    const parsedSection = await create(newSection)
    res.json(parsedSection)
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
}

export const updateSection: RequestHandler = async (req, res) => {
  try {
    const id = idSchemaValidation(req.params.id)
    const section = toNewUpdateSection(req.body)
    const parsedSection = await update(id, section)
    res.json(parsedSection)
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
}

export const deleteSection: RequestHandler = async (req, res) => {
  try {
    const id = idSchemaValidation(req.params.id)
    const isDeleted = await destroy(id)
    res.json(isDeleted)
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
}