import joi from "joi"

export const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


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