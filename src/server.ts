import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import path from 'path'
import mongoose from 'mongoose'
import initDB from './db/init'
import { corsOptions } from './lib/cors/corsOptions'
import routerRoot from './routes/root'
import routerDinosaur from './routes/api/dinosaurRouter'
import routerArticle from './routes/api/articleRouter'
import routerAsset from './routes/api/assetRouter'
import routerSection from './routes/api/sectionRouter'
import credentials from './middleware/credentials'
import cookieParser from 'cookie-parser'
import routerAuth from './routes/auth'
import routerRegister from './routes/register'
import routerRefresh from './routes/refresh'
import routerLogout from './routes/logout'
import routerTest from './routes/test'

config()

const app = express()
const PORT = process.env.PORT || 8080
const APIPATH = '/api'
//DB
initDB()

//MIDDLEWARE
app.use(credentials)
app.use('/login',routerAuth)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

//ROUTES
app.use('/',routerRoot)
app.use('/login',routerAuth)
app.use('/register',routerRegister)
app.use('/refresh',routerRefresh)
app.use('/logout',routerLogout)
app.use(`${APIPATH}/dinosaurs`,routerDinosaur)
app.use(`${APIPATH}/articles`,routerArticle)
app.use(`${APIPATH}/assets`,routerAsset)
app.use(`${APIPATH}/sections`,routerSection)
app.use(`${APIPATH}/test`,routerTest)
//

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')) res.sendFile(path.join(__dirname, 'views', '404.html'))
    else if(req.accepts('json')) res.json({ 'error' : '404 not found' })
    else res.type('text').send('404 not found')
})

mongoose.connection.once('open', () => {
    console.log('Conected to MONGO DB')
    app.listen( PORT, () => {
        console.log(`SERVER RUNNING ON PORT ${PORT}`)
    }) 
})

