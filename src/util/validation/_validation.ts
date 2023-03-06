import { Schema ,Types } from "mongoose"

/**
 * A function it validates if entry is a string
 * @param {any} string - Any "string" value
 * @return {boolean} Returns true if typeof or instanceof is string, otherwise returns false
 */
export const isString = (string: any): boolean => typeof string === 'string' || string instanceof String

/**
 * A function it validates if entry is a number
 * @param {any} number - Any "number" value
 * @return {boolean} Returns true if typeof is number and is greater than 0 , otherwise returns false
 */
export const isNumber = (number: any): boolean => typeof number === 'number' && number > 0

/**
 *
 * @param stringFromRequest
 * @return string
 */
export const stringValidation = (stringFromRequest: any): string => {
  if(!isString(stringFromRequest)){
    throw new Error('Incorrect or missing string value')
  }
  return stringFromRequest
}
/**
 *
 * @param numberFromRequest
 */
export const numberValidation = (numberFromRequest: any): number => {
  if(!isNumber(numberFromRequest)){
    throw new Error('Incorrect or missing number value')
  }
  return numberFromRequest
}

export const idSchemaValidation = (idFromRequest: any): Schema.Types.ObjectId => {
  const isId = Types.ObjectId.isValid(idFromRequest)
  if(!isId){
    throw new Error('Incorrect or missing id value')
  }
  return idFromRequest
}
