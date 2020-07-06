const joi = require('@hapi/joi')

const signupChecks = (data) => {
    const validationSchema = joi.object({
        username: joi.string().min(4),
        email: joi.string().min(4).email(),
        password: joi.string().min(4)
    })
    return validationSchema.validate(data)
}

const loginChecks = (data) => {
    const validationSchema = joi.object({
        email: joi.string().min(5).email().required(),
        password: joi.string().min(4).required()
    })
    return validationSchema.validate(data)
}


module.exports.signupChecks = signupChecks
module.exports.loginChecks = loginChecks