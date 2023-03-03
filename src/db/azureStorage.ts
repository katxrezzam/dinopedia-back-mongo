import { DefaultAzureCredential } from '@azure/identity'
import { BlobServiceClient } from '@azure/storage-blob'
import { config } from 'dotenv'
import { RequestHandler } from 'express'
import { v1 as uuidv1 } from 'uuid'

config()

export const storageAuth: RequestHandler = async (_req, res) => {
  try {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME

    if (!accountName) throw Error('Azure Storage accountName not found')

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      new DefaultAzureCredential()
    )
    // Create a unique name for the container
    const containerName = 'quickstart' + uuidv1();

    console.log('\nCreating container...');
    console.log('\t', containerName);

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // Create the container
    const createContainerResponse = await containerClient.create();
    console.log(
      `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`
    );
    // Create a unique name for the blob
    const blobName = 'quickstart' + uuidv1() + '.txt';

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Display blob name and url
    console.log(
      `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
    );

    // Upload data to the blob
    const data = 'Hello, World!';
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
    console.log(
      `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
    );
    res.json({ 'message': 'All went fine' })
  } catch (ex: any) {
    console.error(`Error: ${ex.message}`)
    res.json({ 'Error': `${ex.message}` })
  }
}


