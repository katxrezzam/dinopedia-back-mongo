import { Router }  from 'express'
import { storageAuth } from '../../db/azureStorage'

const azureRouter = Router()

azureRouter.route('/').get(storageAuth)
export default azureRouter