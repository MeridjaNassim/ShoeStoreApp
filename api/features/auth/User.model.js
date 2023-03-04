import mongoose from "mongoose";
import { validateEmail } from "../../util/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
export const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
    }
},
    {
        timestamps: true // to add createdAt and updatedAt fields
    }
)

// hash password before saving to database
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// generate token

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString(),role : user.role}, process.env.JWT_SECRET,{expiresIn: '1h'})
    return token
}

// compare password
userSchema.methods.comparePassword = async function (password) {
    const user = this
    return bcrypt.compare(password, user.password)
}

// find user by username or email
userSchema.statics.findByUsernameOrEmail = async function (usernameOrEmail) {
    const user = await this.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] })
    return user
}

// find user by id
userSchema.statics.getUserDocByID = async function (id) {
    const user = await this.findById(id)
    return user
}


const model = mongoose.model('User', userSchema)




export default model;