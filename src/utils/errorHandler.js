// src/utils/errorHandler.js
function handleError(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        switch (error.response.status) {
            case 404:
                return new Error('Customer not found');
            case 401:
                return new Error('Unauthorized access to API');
            case 403:
                return new Error('Forbidden access to API');
            default:
                return new Error(`API Error: ${error.response.status}`);
        }
    } else if (error.request) {
        // The request was made but no response was received
        return new Error('No response from API server');
    } else {
        // Something happened in setting up the request that triggered an Error
        return new Error('Error setting up the request');
    }
}

module.exports = {
    handleError
};