import express from 'express'
import authJwt from './AuthJWT.js'
import OAuth from './OAuth.js'
import { showUserJwt } from '../controller/ShowUser.js'

const app = express.Router()

app.use('/jwt', authJwt)
app.get('/jwt', showUserJwt)
app.use('/google', OAuth)

export default app