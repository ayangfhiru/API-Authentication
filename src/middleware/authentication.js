import 'dotenv/config'
import jwt from 'jsonwebtoken'

const getToken = (req) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    return token
}

export const jwtAuthentication = (req, res, next) => {
    const token = getToken(req)
    if (!token) { return res.status(401).json({ message: 'Access denied!' }) }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) { return res.status(403).json({ message: 'Invalid token', error: err }) }
        req.user = user
        next()
    })
}

export const basicAuthentication = (req, res, next) => {
    const token = getToken(req)
    if (!token) {
        return res.status(401).set('WWW-Authenticate', 'Basic')
            .json({ message: "Not Authenticated! Token" })
    }

    const auth = new Buffer.from(token, 'base64').toString().split(':')
    const username = auth[0]
    const password = auth[1]

    if (!(username == 'ghege' && password == 'pass')) {
        return res.status(401).set('WWW-Authenticate', 'Basic')
            .json({ message: "Not Authenticated!" })
    }

    req.data = auth
    res.status(200)
    next()
}