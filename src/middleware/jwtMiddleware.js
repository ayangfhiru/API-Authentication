import jwt from 'jsonwebtoken'

export const verifyTokenJwt = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) { return res.status(401).json({ error: 'Access denied!' }) }
    try {
        const decode = jwt.verify(token, 'babi-anak-limo')
        req.userId = decode.userId
        next()
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}