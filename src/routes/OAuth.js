import express from "express";
import passport from "../config/Passport.js";

const app = express.Router()

app.get('/login', passport.authenticate('google'))

app.get('/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/')
})

export default app