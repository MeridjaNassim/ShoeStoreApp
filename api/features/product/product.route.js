import express from "express"
import productController from "./product.controller.js"
import { authMiddleware as auth, isAdmin } from "../../middlewares/auth.js"
import commentController from "./comment.controller.js"
const router = express.Router()


router
    .route("/")
    // Gets all the products
    .get(async (req, res, next) => {
        try {
            const products = await productController.getAllProducts()
            res.send(products)
        } catch (err) {
            switch (err.code) {
                case 1:
                    res.status(500).send({ success: false, message: err.message })
                default:
                    next(err)
            }
        }
    })
    // Create Product Route
    .post(auth, isAdmin, async (req, res, next) => {
        try {
            const productInfo = req.body
            const product = await productController.createNewProduct(productInfo)
            res.send(product)
        } catch (err) {
            switch (err.code) {
                case 1:
                    return res.status(400).send({ success: "false", message: err.message })
                default:
                    next(err)
            }
        }
    })

// /products/:id

router
    .route("/:id")
    // Get Product by ID
    .get(async (req, res, next) => {
        try {
            const product = await productController.getProductByID(req.params.id)
            res.send(product)
        } catch (err) {
            switch (err.code) {
                case 1:
                    return res.status(404).send({ success: false, message: err.message })
                default:
                    next(err)
            }
        }
    })
// products/:id/comments
router
    .route("/:id/comments")
    // Create comment on product with id :id
    .get(auth, async (req, res, next) => {
        try {
            const comments = await commentController.getCommentsByProductID(req.params.id)
            res.send(comments)
        } catch (err) {
            switch (err.code) {
                default:
                    next(err)
            }
        }
    })
    .post(auth, async (req, res, next) => {
        try {
            await commentController.createComment({
                comment: req.body.comment,
                productID: req.params.id,
                userID: req.user._id
            })
            res.status(201).send({ success: true })
        } catch (err) {
            switch (err.code) {
                case 1:
                case 2:
                    res.status(400).send({ success: false, message: err.message })
                default:
                    next(err)
            }
        }
    })
router
    .route("/:id/comments/:commentId")
    .patch(auth, async (req, res, next) => {
        try {
            const newUpdatedComment = await commentController.updateCommentByID(req.user, req.params.id, req.params.commentId, req.body)
            return res.send(newUpdatedComment)
        } catch (err) {
            switch (err.code) {
                case 1:
                    return res.status(404).send({ success: false, message: err.message })
                case 2:
                    return res.status(500).send({ success: false, message: err.message })
                case 3:
                    return res.status(401).send({ success: false, message: err.message })
                default:
                    next(err)
            }
        }
    })
    .delete(auth, async (req, res, next) => {
        try {
            await commentController.deleteCommentByID(req.user, req.params.id, req.params.commentId)
            return res.send({ success: true })
        } catch (err) {
            switch (err.code) {
                case 1:
                case 2:
                    return res.status(404).send({ success: false, message: err.message })
                case 3:
                    return res.status(401).send({ success: false, message: err.message })
                default:
                    next(err)

            }
        }
    })



export default router