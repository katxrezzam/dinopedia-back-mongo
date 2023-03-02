import { Schema } from "mongoose";
import { Section, SectionInput, SectionOutput } from "../models/Section";

export const findAll = async (): Promise<SectionOutput[]> => {
  return await Section.find()
}

export const findById = async (id: Schema.Types.ObjectId): Promise<SectionOutput> => {
  const section = await Section.findById(id)
  if(!section) throw new Error('Section not found')
  return section
}

export const findByArticle = async(article_id: Schema.Types.ObjectId): Promise<SectionOutput[]> => {
  const sections = await Section.find({ article_id })
  if(!sections) throw new Error('No section found for this article')
  return sections
}

export const create = async (section: SectionInput): Promise<SectionOutput> => {
  return await Section.create(section)
}

export const update = async (id: Schema.Types.ObjectId, section: Partial<SectionInput>): Promise<SectionOutput> => {
  const foundSection = await Section.findById(id)
  if(!foundSection) throw new Error('Section not found')

  const {title, content, article_id} = section

  if(title) foundSection.title = title
  if(content) foundSection.content = content
  if(article_id) foundSection.article_id = article_id

  return await foundSection.save()
}

export const destroy = async (id: Schema.Types.ObjectId): Promise<boolean> => {
  const section = await Section.findById(id)
  if(!section) throw new Error('Not article found')
  const result = await Section.deleteOne({ _id: id })
  return !!result
}