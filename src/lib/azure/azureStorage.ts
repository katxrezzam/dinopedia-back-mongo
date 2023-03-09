import { BlobServiceClient } from "@azure/storage-blob"
import { config } from "dotenv"

config()

export const getBlobService = (): BlobServiceClient => {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING as string
  return BlobServiceClient.fromConnectionString(connectionString)
}