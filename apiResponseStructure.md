# API Response Structure

This document outlines the expected data structure for the API responses. There are two primary types of responses: a successful response and an error response.

---

## Successful Response

When a customer is successfully found, the API returns the following structure:

```javascript
{
    "success": true,
    "data": {
        "username": "user123",
        "email": "user@example.com",
        "licenseKey": "XXXX-XXXX-XXXX",
        "nickname": "Cool User",
        "status": "active",
        "createdAt": "2024-02-12T00:00:00Z",
        "lastLogin": "2024-02-12T00:00:00Z"
    }
}
```

---

## Error Response

When an error occurs (e.g., the customer is not found), the API returns the following error structure:

```javascript
{
    "success": false,
    "error": {
        "code": "NOT_FOUND",
        "message": "Customer not found"
    }
}
```