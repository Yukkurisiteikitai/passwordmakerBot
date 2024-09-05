const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tekitou')
        .setDescription("The command is Only Used Manager Code\nThat stop This bot"),
    execute: async function(interaction){
        await interaction.reply('何やって!!!!');
    }
}

