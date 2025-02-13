// src/commands/customer.js
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const apiService = require('../services/apiService');
const config = require('../config/config');
const { formatUserEmbed, formatLicenseEmbed } = require('../utils/embedFormatters');

const allowedRoles = process.env.ALLOWED_ROLES ? process.env.ALLOWED_ROLES.split(',') : [];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('customer')
        .setDescription('Retrieve customer information')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
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
        if (!interaction.member.roles.cache.some(role => allowedRoles.includes(role.id))) {
            await interaction.reply({
                content: 'You do not have permission to use this command.',
                flags: ['Ephemeral']
            });
            return;
        }

        await interaction.deferReply();

        const username = interaction.options.getString('username');
        const license = interaction.options.getString('license');
        const email = interaction.options.getString('email');

        try {
            let customerData;
            let embed;

            if (license) {
                customerData = await apiService.getCustomerByLicense(license);
                embed = formatLicenseEmbed(customerData.data);
            } else if (username || email) {
                customerData = username 
                    ? await apiService.getCustomerByUsername(username)
                    : await apiService.getCustomerByEmail(email);
                embed = formatUserEmbed(customerData.data);
            } else {
                await interaction.editReply({
                    content: 'Please provide either a username, license key, or email address.',
                    flags: ['Ephemeral']
                });
                return;
            }

            await interaction.editReply({
                embeds: [embed],
                flags: ['Ephemeral']
            });
        } catch (error) {
            console.error('Command error:', error);
            await interaction.editReply({
                content: `Error: ${error.message}`,
                flags: ['Ephemeral']
            });
        }
    },
};