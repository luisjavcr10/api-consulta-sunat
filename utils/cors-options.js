const cors = require('cors');

const corsOptions = {
    origin: '*', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};

const corsConfig = cors(corsOptions);

module.exports = corsConfig;