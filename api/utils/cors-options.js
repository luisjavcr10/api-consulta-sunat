const cors = require('cors');

const corsOptions = {
    origin: '*', 
    methods: 'GET,POST,PUT,DELETE',
};

const corsConfig = cors(corsOptions);

module.exports = corsConfig;