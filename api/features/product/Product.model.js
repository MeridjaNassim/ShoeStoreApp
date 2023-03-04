import mongoose, { Schema } from "mongoose"

const commentSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true,
        maxLength: 500
    },
    upvotes : {
        type : Number,
        default : 0
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
})


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    size: {
        type: String,
    },
    category: {
        type: String,
        required: true,
        enum: ['electronics', 'clothes&shoes', 'books', 'furniture', 'other'],
    },
    price: {
        required: true,
        type: Schema.Types.Array,
        of: { value: Number, currency: { type: String, enum: ["USD", "EUR", "CAD"], default: "USD" } }
    },
    color : {
        type : String
    },
    rating : {
        type : Number,
        min: 0,
        max : 5
    },
    image : {
        type : String
    },
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

productSchema.statics.getAllProductDocs = async function(){
    const docs = await this.find({})
    return docs
}

productSchema.statics.getProductDocByID = async function(id){
    const doc = await this.findOne({_id : id})
    return doc
}

export const Product = mongoose.model("Product",productSchema)
export const Comment = mongoose.model("Comment",commentSchema)