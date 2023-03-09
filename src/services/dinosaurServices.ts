import { Schema } from "mongoose";
import { Dinosaur, DinosaurInput, DinosaurOutput } from "../models/Dinosaur";

export const findAll = async (): Promise<DinosaurOutput[]> => {
  return await Dinosaur.find()
}

export const findById = async (id: Schema.Types.ObjectId): Promise<DinosaurOutput> => {
  const dino = await Dinosaur.findById(id)
  if(!dino) throw new Error('Not dino found')
  return dino
}

export const create = async (dino: DinosaurInput): Promise<DinosaurOutput> => {
  return await Dinosaur.create(dino)
}

export const update = async(id: Schema.Types.ObjectId, dino: Partial<DinosaurInput>): Promise<DinosaurOutput> => {
  const foundDino = await Dinosaur.findById(id)
  if(!foundDino) throw new Error('Not dino found')

  const { name, location, kind, diet, era, article_id, url_image, url_render } = dino
  if(name) foundDino.name = name
  if(location) foundDino.location = location
  if(kind) foundDino.kind = kind
  if(diet) foundDino.diet = diet
  if(era) foundDino.era = era
  if(article_id) foundDino.article_id = article_id
  if(url_image) foundDino.url_image = url_image
  if(url_render) foundDino.url_render = url_render

  return await foundDino.save()
}

export const destroy = async (id: Schema.Types.ObjectId): Promise<boolean> => {
  const foundDino = await Dinosaur.findById(id)
  if(!foundDino) throw new Error('Not dino found')
  const result = await Dinosaur.deleteOne({ _id: id })
  return !!result
}