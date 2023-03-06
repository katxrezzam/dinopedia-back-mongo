
import { RequestHandler } from "express";
import { getBlobService } from "../lib/azure/azureStorage";
import { errorJson, errorMessage } from "../util/errorLogger";


export const uploadBlob: RequestHandler = async (req, res) => {
  try {
    const { container } = req.body
    const { buffer, originalname } = req.file as Express.Multer.File

    const blobService = getBlobService()

    const containerClient = blobService.getContainerClient(container)
    await containerClient.getBlockBlobClient(originalname).uploadData(buffer)
    res.json( { 'message': 'success' } )
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.log(errorMessage(error))
  }
}
