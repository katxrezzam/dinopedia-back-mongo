import { getBlobService } from "../lib/azure/azureStorage"

export const uploadBlob = async (buffer: Buffer, originalname: string, container: string) => {
  const blobService = getBlobService()
  const containerClient = blobService.getContainerClient(container)
  await containerClient.getBlockBlobClient(originalname).uploadData(buffer)
  console.log(`${originalname} was uploaded successfuly`)
}