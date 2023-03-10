import { RequestHandler } from "express";
import { errorJson, errorMessage } from "../util/errorLogger";
import { toNewFiles } from "../util/validation/filesValidation";

export const handleTest: RequestHandler = (req, res) => {
  try {
    const files = toNewFiles(req.files) 
    console.log(typeof files[0])
    res.json({ 'Files uploaded' : req.files?.length })
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
}


