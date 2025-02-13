// src/commands/customer.js
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const apiService = require('../services/apiService');
const config = require('../config/config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('customer')
        .setDescription('Retrieve customer information')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers) // Optional: Adds base Discord permission requirement
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Customer username')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('license')
                .setDescription('Customer license key')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('email')
                .setDescription('Customer email address')
                .setRequired(false)),

    async execute(interaction) {
        // Check if user has required role
        const hasRequiredRole = interaction.member.roles.cache
            .some(role => config.discord.allowedRoles.includes(role.id));

        if (!hasRequiredRole) {
            await interaction.reply({
                content: 'You do not have permission to use this command.',
                ephemeral: true
            });
            return;
        }

        await interaction.deferReply(); // Make responses private

        const username = interaction.options.getString('username');
        const license = interaction.options.getString('license');
        const email = interaction.options.getString('email');

        try {
            let customerData;

            if (username) {
                customerData = await apiService.getCustomerByUsername(username);
            } else if (license) {
                customerData = await apiService.getCustomerByLicense(license);
            } else if (email) {
                customerData = await apiService.getCustomerByEmail(email);
            } else {
                await interaction.editReply('Please provide either a username, license key, or email address.');
                return;
            }

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Customer Information')
                .addFields(
                    { name: 'Username', value: customerData.data.username || 'N/A', inline: true },
                    { name: 'Email', value: customerData.data.email || 'N/A', inline: true },
                    { name: 'License Key', value: customerData.data.licenseKey || 'N/A', inline: true },
                    { name: 'Nickname', value: customerData.data.nickname || 'N/A', inline: true },
                    { name: 'Status', value: customerData.data.status || 'N/A', inline: true },
                    { name: 'Created At', value: new Date(customerData.data.createdAt).toLocaleDateString() || 'N/A', inline: true },
                    { name: 'Last Login', value: new Date(customerData.data.lastLogin).toLocaleDateString() || 'N/A', inline: true }
                )
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            await interaction.editReply(`Error: ${error.message}`);
        }
    },
};