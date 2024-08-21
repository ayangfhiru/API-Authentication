import { DataTypes } from "sequelize";
import database from "../config/Database.js";

const UserJWT = database.define('user_jwt', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
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