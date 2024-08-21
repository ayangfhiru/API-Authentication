import express from 'express'
import { loginJwt, registerJwt } from '../controller/UserJwtController.js'
import { verifyTokenJwt } from '../middleware/jwtMiddleware.js'

const app = express.Router()

app.post('/register', registerJwt)
app.post('/login', loginJwt)

export default app