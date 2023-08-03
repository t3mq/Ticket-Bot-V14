const { ApplicationCommandType, Colors, EmbedBuilder } = require('discord.js');
const moment = require('moment')
module.exports = {
    name: 'ping',
    description: '(🏓) Pong',
    type: ApplicationCommandType.ChatInput,
    execute: async (client, interaction, args) => {
        interaction.reply("(🏓) Pong")
    }
}