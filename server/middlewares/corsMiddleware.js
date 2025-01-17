const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

module.exports = cors(corsOptions);
