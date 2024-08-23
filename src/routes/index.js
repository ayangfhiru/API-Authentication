import express from 'express'
import jwtRouter from './jwtRoute.js'
import oauthRouter from './oauthRoute.js'
import basicRouter from './basicRoute.js'

const app = express.Router()

app.use('/jwt', jwtRouter)
app.use('/google', oauthRouter)
app.use('/basic', basicRouter)

export default app