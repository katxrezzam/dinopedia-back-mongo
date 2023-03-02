import { Diet, Era, Kind } from "../../enums"
import { CreateDinasaur, UpdateDinosaur } from "../../types"
import { idSchemaValidation, isString, stringValidation } from "./_validation"

const isKind = (kind: any): boolean => {
  return Object.values(Kind).includes(kind)
}

const isEra = (era: any): boolean => {
  return Object.values(Era).includes(era)
}

const isDiet = (diet: any): boolean => {
  return Object.values(Diet).includes(diet)
}

const eraValidation = (eraFromRequest: any): Era => {
  if(!isString(eraFromRequest) || !isEra(eraFromRequest)){
    throw new Error('Incorrect or missing Era value')
  }
  return eraFromRequest
}

const kindValidation = (kindFromRequest: any): Kind => {
  if(!isString(kindFromRequest) || !isKind(kindFromRequest)){
    throw new Error('Incorrect or missing Kind value')
  }
  return kindFromRequest
}

const dietValidation = (dietFromRequest: any): Diet => {
  if(!isString(dietFromRequest) || !isDiet(dietFromRequest)){
    throw new Error('Error or missing Diet value')
  }
  return dietFromRequest
}

export const toNewDinosaur = (object: any): CreateDinasaur => {
  const newDinosaur: CreateDinasaur = {
    name: stringValidation(object.name),
    kind: kindValidation(object.kind),
    location: stringValidation(object.location),
    era: eraValidation(object.era),
    diet: dietValidation(object.diet),
    url_image: stringValidation(object.url_image),
    article_id: idSchemaValidation(object.article_id)
  }
  return newDinosaur
}
export const toNewUpdateDinosaur = (object: any): UpdateDinosaur => {
  const dino: UpdateDinosaur = object

  if(dino.name) dino.name = stringValidation(dino.name)
  if(dino.kind) dino.kind = kindValidation(dino.kind)
  if(dino.location) dino.location = stringValidation(dino.location)
  if(dino.era) dino.era = eraValidation(dino.era)
  if(dino.diet) dino.diet = dietValidation(dino.diet)
  if(dino.url_image) dino.url_image = stringValidation(dino.url_image)
  if(dino.article_id) dino.article_id = idSchemaValidation(dino.article_id)

  return dino
}