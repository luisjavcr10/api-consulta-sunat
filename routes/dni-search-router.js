const express = require('express');
const router = express.Router();
const {getBasicDataRuc}= require('../services/dni-search-service');
const ValidatorHandler = require('../middlewares/validator-handler');
const {getDni} = require('../schemas/get-schema');

router.get('/:dni', 
    ValidatorHandler.handle(getDni, 'params'),
    async (req, res, next) => {
        const dni = req.params.dni;
        try {
            const data = await getBasicDataRuc(dni);
            res.json(data);
        } catch (error) {
            next(error);
        }
});

module.exports= router;