import express from "express";
import authController from "./auth.controller.js";
const router = express.Router();


router.post("/login", async (req, res, next) => {
    try {
        const credentials = req.body
        const loggedUser = await authController.loginWithUsernameOrEmail(credentials)
        res.send(loggedUser)
    }catch(err) {
        switch (err.code) {
            case 1:
                // validation error
                return res.status(400).send({success: false, message : err.message})
            case 2:
            case 3: // invalid credentials
                return res.status(400).send({success : false, message : err.message})
            default:
                next(err)
        }
    }
})

router.post("/signup", async (req, res, next) => {
    try {
        const userInfo = req.body
        const createdUser = await authController.signup(userInfo)
        res.send(createdUser) 
    }catch(err){
        switch(err.code) {
            case 1:
                //validation error
                return res.status(400).send({success : false, message: err.message})
            case 2:
                // user already exists error 
                return res.status(422).send({success : false, message: err.message})
            default:
                return next(err)
        }
    }
})

export default router