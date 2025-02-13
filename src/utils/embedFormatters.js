// src/utils/embedFormatters.js
const { EmbedBuilder } = require('discord.js');

const embedColors = {
    default: '#ff1f8e',
    error: '#ff0000'
};

const formatUserEmbed = (data) => {
    const createdDate = new Date(data.createdAt).toLocaleDateString();
    
    return new EmbedBuilder()
        .setAuthor({
            name: "KickTools",
            url: "https://kicktools.app"
        })
        .setColor('#ff1f8e')
        .setTitle('Customer Information')
        .setURL(`https://kick.com/${data.username}`)
        .setDescription(
            `**${data.fullName}**\n\n` +
            `**E-Mail** - ${data.email}\n` +
            `**Kick** - ${data.username}\n` +
            `**Discord ID** - ${data.discordId}\n\n` +
            `**Customer Since** - ${createdDate}`
        )
        .addFields(
            data.widgets.map(widget => ({
                name: widget.name,
                value: widget.licenseKey
            }))
        )
        .setTimestamp()
        .setFooter({ 
            text: ' ',  // Discord requires some text, even if empty
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
        .setDescription(data.license.key)
        .setURL(data.product.setupLink)
        .addFields(
            { name: 'Setup Link', value: data.product.setupLink },
            { name: 'Status', value: data.license.status },
            { name: 'Widget', value: data.product.name, inline: true },
            { name: 'Kick Username', value: data.username },
            { name: 'E-Mail', value: data.email },
            { name: 'Discord', value: data.discordId }
        )
        .setThumbnail(data.product.iconUrl)
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
