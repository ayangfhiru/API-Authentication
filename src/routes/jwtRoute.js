import express from 'express'
import { loginJwt, refreshTokenJwt, registerJwt } from '../controller/UserJwtController.js'
import { jwtAuthentication } from '../middleware/authentication.js'

const app = express.Router()

app.post('/register', registerJwt)
app.post('/login', loginJwt)
app.post('/refresh', refreshTokenJwt)
app.get('/protected', jwtAuthentication, (req, res,) => {
    res.send(`Protected URI ${req.user.userId}`)
})

export default app