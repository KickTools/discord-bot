// src/utils/embedFormatters.js
const { EmbedBuilder } = require('discord.js');

const embedColors = {
    default: '#ff1f8e',
    error: '#ff0000'
};

const formatUserEmbed = (data) => {
    const createdDate = data.createdAt 
        ? new Date(data.createdAt).toLocaleDateString() 
        : "Unknown";

    return new EmbedBuilder()
        .setAuthor({
            name: "KickTools",
            url: "https://kicktools.app"
        })
        .setColor(embedColors.default)
        .setTitle('Customer Information')
        .setURL(`https://kick.com/${data.username || ""}`)
        .setDescription(
            `**${data.fullName || "Unknown"}**\n\n` +
            `**E-Mail** - ${data.email || "Unknown"}\n` +
            `**Kick** - ${data.username || "Unknown"}\n` +
            `**Discord ID** - ${data.discordId || "Unknown"}\n\n` +
            `**Customer Since** - ${createdDate}`
        )
        .addFields(
            (data.widgets && data.widgets.length > 0) 
                ? data.widgets.map(widget => ({
                    name: widget.name || "Unknown Widget",
                    value: widget.licenseKey || "No License Key"
                })) 
                : [{ name: "Widgets", value: "No widgets found" }]
        )
        .setTimestamp()
        .setFooter({ 
            text: ' ',
            iconURL: "https://kt-public-images.s3.us-east-2.amazonaws.com/widgets/logo-light-kicktools.png"
        });
};

const formatLicenseEmbed = (data) => {
    return new EmbedBuilder()
        .setAuthor({
            name: "KickTools",
            url: "https://kicktools.app"
        })
        .setColor(embedColors.default)
        .setTitle('License Key')
        .setDescription(data.license?.key || "No License Key Found")
        .setURL(data.product?.setupLink || "https://kicktools.app")
        .addFields(
            { name: 'Setup Link', value: data.product?.setupLink || "N/A" },
            { name: 'Status', value: data.license?.status || "Unknown" },
            { name: 'Widget', value: data.product?.name || "Unknown", inline: true },
            { name: 'Kick Username', value: data.username || "Unknown" },
            { name: 'E-Mail', value: data.email || "Unknown" },
            { name: 'Discord', value: data.discordId || "Unknown" }
        )
        .setThumbnail(data.product?.iconUrl || "https://kicktools.app/default-icon.png")
        .setTimestamp()
        .setFooter({ 
            text: ' ',
            iconURL: "https://kt-public-images.s3.us-east-2.amazonaws.com/widgets/logo-light-kicktools.png"
        });
};

module.exports = {
    formatUserEmbed,
    formatLicenseEmbed
};
