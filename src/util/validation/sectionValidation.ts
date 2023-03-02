import { CreateSection, UpdateSection } from "../../types";
import { idSchemaValidation, stringValidation } from "./_validation";

export const toNewSection = (object: any): CreateSection => {
  const newSection: CreateSection = {
    title: stringValidation(object.title),
    content: stringValidation(object.content),
    article_id: idSchemaValidation(object.article_id)
  }
  return newSection
}

export const toNewUpdateSection = (object: any): UpdateSection => {
  const section: UpdateSection = object

  if(section.title) section.title = stringValidation(object.title)
  if(section.content) section.content = stringValidation(object.content)
  if(section.article_id) section.article_id = idSchemaValidation(object.article_id)

  return section
}
