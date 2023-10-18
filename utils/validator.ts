import joi from "joi"


const regex =  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;

export const registerValidator = joi.object({
    name:joi.string().required(),
    email:joi.string().email().lowercase().trim(),
    password:joi.string().pattern(new RegExp(regex)).required()
})

export const signInValidator = joi.object({
    email:joi.string().email().lowercase().trim(),
    password:joi.string().pattern(new RegExp(regex)).required()
})