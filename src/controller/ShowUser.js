import UserJWT from "../models/UserJWT.js"

export const showUserJwt = async (req, res) => {
    const user = UserJWT.findAll()
    res.status(200).json({ 'data': user })
}