import { Router } from 'express'
import { uploadBlob } from '../../controllers/blobController'
import { upload } from '../../lib/multerConfig'

const routerBlob = Router()
routerBlob.post('/create', upload.single("file") , uploadBlob)

export default routerBlob