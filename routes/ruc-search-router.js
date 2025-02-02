const express = require('express');
const router = express.Router();
const {getAllDataRuc,getBasicDataRuc} = require('../services/ruc-serch-service');
const ValidatorHandler = require('../middlewares/validator-handler');
const {getRuc} = require('../schemas/get-schema');

router.get('/:ruc/all', 
    ValidatorHandler.handle(getRuc, 'params'), 
    async (req, res, next) => {
        const ruc = req.params.ruc;
        try {
            const data = await getAllDataRuc(ruc);
            res.json(data);
        } catch (error) {
            next(error);
        }
});

router.get('/:ruc/basic', 
    ValidatorHandler.handle(getRuc, 'params'),
    async (req, res, next) => {
        const ruc = req.params.ruc;
        try {
            const data = await getBasicDataRuc(ruc);
            res.json(data);
        } catch (error) {
            next(error);
        }
});

module.exports= router;
