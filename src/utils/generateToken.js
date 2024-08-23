import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const generateAccessToken = async (payload) => {
    const options = {
        expiresIn: '15m'
    }

    const accesToken = jwt.sign(
        { userId: payload.id },
        process.env.ACCESS_TOKEN_SECRET,
        options
    )
    return accesToken
}

export const generateRefreshToken = async (payload) => {
    const options = {
        expiresIn: '1d'
    }

    const refreshToken = jwt.sign(
        { userId: payload.id },
        process.env.REFRESH_TOKEN_SECRET,
        options
    )
    return refreshToken
}