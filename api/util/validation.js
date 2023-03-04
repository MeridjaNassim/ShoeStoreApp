import joi from "joi"

export const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
// Login Validation
const loginValidationSchema = joi.object({
    usernameOrEmail : joi.string().required(),
    password : joi.string().min(8).required(),
})

export const validateLogin = function (info) {return loginValidationSchema.validate(info)}

// Signup Validation
const signUpValidationSchema = joi.object({
    username : joi.string().required(),
    password : joi.string().min(8).required(),
    email : joi.string().email().required(),
    firstName : joi.string().required(),
    lastName : joi.string().required(),
})

export const validateSignup = function (info) {
    return signUpValidationSchema.validate(info)
}

// Product Validation

const createProductSchema = joi.object({
    name : joi.string().required(),
    description: joi.string(),
    image: joi.string(),
    size: joi.string(),
    color: joi.string(),
    price : joi.array().items(joi.object({
        value : joi.number().required(),
        currency : joi.string().valid("USD","EUR","CAD").required()
    })),
    category : joi.string().valid("electronics","clothes&shoes","books","furniture","other").required(),
    rating : joi.number().min(0).max(5)
})

export const validateCreateProduct = function(product) {return createProductSchema.validate(product)} 