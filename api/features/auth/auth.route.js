import e from "express";
import express from "express";
import { validateSignup } from "../../util/validation.js"
import User from "./User.model.js";
const router = express.Router();


router.post("/login", async (req, res, next) => {
    const { usernameOrEmail, password } = req.body;
    try {
        const user = await User.findByUsernameOrEmail(usernameOrEmail)
        if (!user) {
            return res.status(400).send({ error: "Invalid login credentials" })
        }
        const isPasswordMatch = await user.comparePassword(password)
        if (!isPasswordMatch) {
            return res.status(400).send({ error: "Invalid login credentials" })
        }
        const token = await user.generateAuthToken()
        res.send({ token: token, username: user.username, email: user.email, id: user._id, firstName: user.firstName, lastName: user.lastName })
    }catch(err) {
        //console.log(err)
        next(err)
    }
})

router.post("/signup", async (req, res, next) => {

    const { error } = validateSignup(req.body);

    if (error) return res.status(400).send(error.details[0].message)

    const { username, password, email, firstName, lastName } = req.body;

    const user = new User({
        username,
        password,
        email,
        firstName,
        lastName,
        role: "user"
    })

    try {
        const doc = await user.save()
        const token = await user.generateAuthToken()
        res.send({ token: token, username: doc.username, email: doc.email, id: doc._id, firstName: doc.firstName, lastName: doc.lastName })
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate username
            return res.status(422).send({ succes: false, message: 'User already exist!' });
        }
        next(err)
    }
})

export default router