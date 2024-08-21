import jwt from 'jsonwebtoken'

export const createToken = async (req) => {
    const { id } = req
    const token = jwt.sign({ userId: id }, 'babi-anak-limo', {
        expiresIn: '1h'
    })
    return token
}