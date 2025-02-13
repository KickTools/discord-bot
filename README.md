# Discord Customer Lookup Bot

This is a Discord bot that allows authorized users to retrieve customer information via API calls using the `/customer` command.

## Features
- Retrieve customer details using username, license key, or email.
- Uses Discord slash commands.
- Role-based access control to restrict usage.
- API integration to fetch customer data.

## Installation

First, clone the repository:

```sh
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO
```

**Important:** Replace `YOUR-USERNAME` with your actual GitHub username and `YOUR-REPO` with your repository’s actual name.

## Setup Instructions

### 1. Install Dependencies
Run the following command to install all required dependencies:

```sh
npm install
```

### 2. Configure Environment Variables
Create a `.env` file from the provided example:

```sh
cp .env.example .env
```

Then open the `.env` file and fill in your credentials:

```ini
DISCORD_TOKEN=your-discord-bot-token
CLIENT_ID=your-discord-application-client-id
API_BASE_URL=https://your-api.com
ALLOWED_ROLES=role1,role2,role3
ENDPOINT_USERNAME=/customers/username/
ENDPOINT_LICENSE=/customers/license/
ENDPOINT_EMAIL=/customers/email/
```

**Important:** Replace the placeholders with your actual Discord bot token, Discord application client ID, API base URL, allowed roles, and endpoint URLs.

### 3. Deploy Discord Slash Commands

Before starting the bot, deploy your slash commands with the provided `deploy-commands.js` script. This registers your commands with Discord. You can run this script using npm:

```sh
npm run deploy
```

The output should be similar to:

```
Started refreshing application (/) commands.
Successfully reloaded application (/) commands.
```

### 4. Start the Bot

After deploying the commands, start the bot using:

```sh
npm start
```

## Usage
- The bot listens for the `/customer` command in Discord.
- It accepts the following options:
  - `username` – Fetch customer details by username.
  - `license` – Fetch customer details by license key.
  - `email` – Fetch customer details by email.
- If the user lacks permission, the bot denies access.

## Contributing
If you'd like to contribute, fork the repository and submit a pull request.

---

### Things to Double-Check:
1. **Repository Cloning Permissions:** If your repository is private, ensure users have the correct permissions to clone it.
2. **Environment Variables:** Verify that all environment variables are correctly set in your `.env` file.
3. **API Endpoints:** Confirm that the API endpoints are correctly configured and accessible.
4. **Role-Based Access Control:** Ensure that the allowed roles are correctly set and match the roles in your Discord server.
```