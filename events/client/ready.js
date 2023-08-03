const colors = require('colors');
const config = require('../../settings/config');
const { ActionRowBuilder, Colors, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'ready',
    once: false,
    execute: async (client) => {
        console.log(`[READY] ${client.user.tag} (${client.user.id}) is ready !`.green);

        let channelTicket = client.channels.cache.get(config.ticket_channel);
        channelTicket.bulkDelete(2);

        await channelTicket.send({
            embeds: [{
                title: "Ticket System",
                description: "If you want to open a ticket for contact the staff, click on the button below !",
                color: Colors.Blurple,
                footer: {
                    name: "Ticket System",
                },
                timestamp: new Date(),
            }],
            components: [
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder() .setCustomId('ticket') .setLabel('Open a ticket') .setStyle(ButtonStyle.Secondary)
                )
            ]
        })
    }
}