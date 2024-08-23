import express from "express";
import { basicAuthentication } from "../middleware/authentication.js";

const app = express.Router()

app.get('/login', basicAuthentication, (req, res) => {
    res.send(`Oke Success ${req.data[0]}`)
})

export default app