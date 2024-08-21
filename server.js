import 'dotenv/config'
import express from 'express'
import database from './src/config/Database.js'
import routes from './src/routes/index.js'
import passport from 'passport'

const app = express()

app.use(express.json())
app.use(passport.initialize())
// app.use(passport.session())

app.use('/api', routes)

database.authenticate().then(() => {
    app.listen(process.env.API_PORT, (err) => {
        if (err) {
            console.log("Server not running", err);
        } else {
            console.log("Connection has been established successfully. " + process.env.API_PORT);
        }
    })
}).catch(err => console.error('Unable to connect to the database:', err))