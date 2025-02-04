const Joi = require('joi');

const getRuc = Joi.object({
    ruc: Joi.string().min(11).max(11).required(),
})

const getDni = Joi.object({
    dni: Joi.string().min(8).max(8).required(),
})

module.exports = {
    getRuc,
    getDni
}