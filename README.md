# Discord Customer Lookup Bot

This is a Discord bot that allows authorized users to retrieve customer information via API calls using a `/customer` command.

## Features
- Retrieve customer details using username, license key, or email.
- Uses Discord slash commands.
- Role-based access control to restrict usage.
- API integration to fetch customer data.

## Setup Instructions

### **1. Clone the Repository**
```sh
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file from the provided example:
```sh
cp .env.example .env
```
Edit `.env` and fill in your credentials:
```ini
DISCORD_TOKEN=your-discord-bot-token
API_BASE_URL=https://your-api.com
ALLOWED_ROLES=role1,role2,role3
ENDPOINT_USERNAME=/customers/username/
ENDPOINT_LICENSE=/customers/license/
ENDPOINT_EMAIL=/customers/email/
```

### **4. Start the Bot**
Run:
```sh
node src/index.js
```

## **Usage**
- The bot listens for the `/customer` command in Discord.
- It accepts the following options:
  - `username` - Fetch customer by username.
  - `license` - Fetch customer by license key.
  - `email` - Fetch customer by email.
- If the user lacks permission, the bot denies access.

## **Contributing**
If you'd like to contribute, fork the repository and submit a pull request.

---

