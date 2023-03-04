import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    items : [{
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product",
            required : true
        },
        quantity : {
            type : Number,
            required : true,
            default : 1,
            min : 1
        }
    }]
})

cartSchema.statics.findByUserId = async function (userId) {
    const cart = await this.findOne({owner : userId})
    return cart
}

export default mongoose.model("Cart",cartSchema)