const express = require('express');
const config = require(`./config/${process.env.NODE_ENV}.js`)
const routerApi = require('./routes');
const corsConfig = require('./utils/cors-options');
const ErrorHandler = require('./middlewares/error-handler');

const app = express();
console.log('Entorno actual:', process.env.NODE_ENV);
const port = 3000;

app.use(corsConfig);

routerApi(app);

app.use(ErrorHandler.logErrors);
app.use(ErrorHandler.boomErrorHandler);
app.use(ErrorHandler.errorHandler);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});