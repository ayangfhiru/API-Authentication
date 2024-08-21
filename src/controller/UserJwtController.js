import UserJWT from "../models/UserJWT.js"
import { hashPass, matchPass } from "../utils/bcryptHash.js"
import { createToken } from "../utils/createToken.js"

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

        const token = await createToken(user)
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
}

export const logoutJwt = async (req, res) => {

}