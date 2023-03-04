import express from "express"
import {authMiddleware as auth} from "../../middlewares/auth.js"
import cartController from "./cart.controller.js"

const router = express.Router()


// /cart/

router
.route("/")
// Route to get the cart of a user
.get(auth, async(req,res,next) =>{
    try {
        const cart = await cartController.getCart(req.user._id)
        return res.send(cart)
    }catch(err){
        switch (err.code) {
            case 1:
            case 2:
                return res.status(400).send({success : false , message : err.message})
            default:
                next(err)
        }
    }
})

export default router