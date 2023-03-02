import { Router } from 'express'
import path from 'path'

const routerRoot = Router()

routerRoot.get('^/$|/index(.html)?', (_req, res) => {
  res.sendFile(path.join(__dirname, '..','views','index.html'))
})

export default routerRoot