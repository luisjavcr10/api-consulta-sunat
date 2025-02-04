const express = require('express');
const rucRouter = require('./ruc-search-router');
const dniRouter = require('./dni-search-router');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../config/swagger/options.json');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/ruc', rucRouter);
    router.use('/dni', dniRouter);
    router.use('/api-docs',swaggerUi.serve);
    router.get('/api-docs', swaggerUi.setup(swaggerDocument));
}

module.exports = routerApi;
