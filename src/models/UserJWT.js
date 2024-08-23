import { DataTypes } from "sequelize";
import database from "../config/Database.js";

const UserJWT = database.define('jwt_user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const asynchronous = async () => {
    await database.sync({})
}
asynchronous()

export default UserJWT