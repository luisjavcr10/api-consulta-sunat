const express = require('express');
const rucRouter = require('./ruc-search-router');
const dniRouter = require('./dni-search-router');

function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/ruc',rucRouter);
    router.use('/dni',dniRouter);
};

module.exports= routerApi;