import productController from "./product.controller.js"
import userController from "../user-mgmt/user.controller.js"
import { Comment, Product } from "./Product.model.js"
class CommentController {
    async getCommentsByProductID(id) {

        try {
            const query = Product.findOne({ _id: id }).populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "username"
                },
                options: { sort: { "upvotes": -1 } }
            })
            const product = await query.exec()
            return product.comments
        } catch (err) {
            throw {
                code: 1,
                message: "Cannot find product with id " + id
            }
        }
    }
    async createComment({ comment, productID, userID }) {

        try {
            const product = await productController.getProductByID(productID)
            const user = await userController.getUserByID(userID)
            const newComment = new Comment({
                text: comment,
                user: user._id,
            })
            const doc = await newComment.save()
            product.comments.push(doc._id)
            await product.save()

        } catch (err) {
            switch (err.code) {
                case 1:// product not found
                case 2:// user not found
                    throw err
                default:
                    throw {
                        code: 3,
                        message: "Error while creating new comment"
                    }
            }
        }

    }

    async updateCommentByID(user,productId, commentId, update) {
        const product = await Product.findById(productId)
        if (!product) {
            throw {
                code: 1,
                message: `Product with id ${productId} not found.`
            }
        }
        try {
            const oldComment = await Comment.findById(commentId)
            if(!oldComment){ 
                throw {
                    code : 2,
                    message : "Comment doesnt exist"
                }
            }
            if(oldComment.user.toString() !== user._id){
                throw {
                    code : 3,
                    message: "Unauthorized to update this comment"
                }
            }
            const newComment = await Comment.findOneAndUpdate(commentId,update,{new : true})
            return newComment
        } catch (err) {
            if(err.code) throw err
            throw {
                code: 2,
                message: `Error while updating comment with id ${id}`
            }
        }

    }
    async deleteCommentByID(user,productId, commentId) {
        const product = await Product.findById(productId)
        if (!product) {
            throw {
                code: 1,
                message: `Product with id ${productId} not found.`
            }
        }
        const oldComment = await Comment.findById(commentId)
        if(!oldComment)
        {
            throw {
                code : 2,
                message: "Comment doesnt exist"
            }
        }
        if(oldComment.user.toString() !== user._id){
            throw {
                code : 3,
                message: "Unauthorized to delete this comment"
            }
        }
        try {
            product.comments = product.comments.filter(comment => comment._id !== commentId)
            //console.log("comments", product.comments)
            await product.save()
        }catch(err){
            if(err.code) throw err
            throw {
                code : 2,
                message : "Error while removing comment from product"
            }
        }
        try {
            await Comment.findByIdAndDelete(commentId)
        }catch(err){ 
            throw {
                code : 3,
                message : "Error while deleting comment"
            }
        }
        
    }
}


export default new CommentController()