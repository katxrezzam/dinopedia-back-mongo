import { bufferValidation, stringValidation } from "./_validation"

export const toNewFiles = (files: any): Express.Multer.File[] => {
  files.map( (file: any) => {
    file.buffer = bufferValidation(file.buffer)
    file.originalname = stringValidation(file.originalname)
  } )
  return files
}