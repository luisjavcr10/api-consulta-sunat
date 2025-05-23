const express = require('express');
const routerApi = require('./routes');
const corsConfig = require('./utils/cors-options');
const ErrorHandler = require('./middlewares/error-handler');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(corsConfig);

routerApi(app);

app.use(ErrorHandler.logErrors);
app.use(ErrorHandler.errorHandler);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
