// src/config/config.js
require('dotenv').config();

const BASE_URL = process.env.API_BASE_URL || 'https://default-api.com';

module.exports = {
    discord: {
        token: process.env.DISCORD_TOKEN,
        allowedRoles: process.env.ALLOWED_ROLES ? process.env.ALLOWED_ROLES.split(',') : []
    },
    api: {
        baseUrl: BASE_URL,
        endpoints: {
            username: process.env.ENDPOINT_USERNAME || '/customers/username/',
            license: process.env.ENDPOINT_LICENSE || '/customers/license/',
            email: process.env.ENDPOINT_EMAIL || '/customers/email/'
        }
    }
};