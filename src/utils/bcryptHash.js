import bcrypt from 'bcrypt'

export const hashPass = async (req) => {
    const { password } = req
    const newPass = await bcrypt.hash(password, 10)
    return newPass
}

export const matchPass = async (req) => {
    const { passwordIn, passwordDB } = req
    const compare = await bcrypt.compare(passwordIn, passwordDB)
    return compare
}