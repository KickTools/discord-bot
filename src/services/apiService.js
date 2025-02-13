// src/services/apiService.js
const axios = require('axios');
const config = require('../config/config');
const { handleError } = require('../utils/errorHandler');

class ApiService {
    constructor() {
        this.baseUrl = config.api.baseUrl;
    }

    async getCustomerByUsername(username) {
        try {
            const response = await axios.get(`${this.baseUrl}${config.api.endpoints.username}${username}`);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    }

    async getCustomerByLicense(license) {
        try {
            const response = await axios.get(`${this.baseUrl}${config.api.endpoints.license}${license}`);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    }

    async getCustomerByEmail(email) {
        try {
            const response = await axios.get(`${this.baseUrl}${config.api.endpoints.email}${email}`);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    }
}

module.exports = new ApiService();