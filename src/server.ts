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

config()

const app = express()
const PORT = process.env.PORT || 8080
const APIPATH = '/api'
//DB
initDB()

//MIDDLEWARE
app.use(express.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))

//ROUTES
app.use('/',routerRoot)
app.use(`${APIPATH}/dinosaurs`,routerDinosaur)
app.use(`${APIPATH}/articles`,routerArticle)
app.use(`${APIPATH}/assets`,routerAsset)
app.use(`${APIPATH}/sections`,routerSection)
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

