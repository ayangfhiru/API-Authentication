import 'dotenv/config'
import UserJWT from "../models/UserJWT.js"
import { hashPass, matchPass } from "../utils/bcryptPassword.js"
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js"
import jwt from 'jsonwebtoken'

export const registerJwt = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashPassword = await hashPass({ password })
        const user = UserJWT.build({
            name, email, password: hashPassword
        })
        await user.save()
        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
}

export const loginJwt = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await UserJWT.findOne({ where: { email: email } })
        if (!user) { return res.status(401).json({ error: 'Authentication failed!' }) }

        const passwordMatch = await matchPass({ passwordIn: password, passwordDB: user.password })
        if (!passwordMatch) { return res.status(401).json({ error: 'Authentication failed!' }) }

        const accessToken = await generateAccessToken(user)
        const refreshToken = await generateRefreshToken(user)
        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
}

export const refreshTokenJwt = async (req, res) => {
    try {
        const authHeader = req.header('Authorization')
        const refreshToken = authHeader && authHeader.split(' ')[1]

        if (!refreshToken) { return res.status(401).json({ error: 'Access denied!' }) }

        const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const accessToken = await generateAccessToken({ id: decode.userId })
        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Invalid.' });
    }
}