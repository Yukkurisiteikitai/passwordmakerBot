const {SlashCommandBuilder} = require('discord.js');
//変数
const words = ["a","q","z","w","s","x","e","d","c","r","f","v","t","g","b","y","h","n","u","j","m","i","k",",","o","l","p","4","6","8","0","6","3","1","~","^","@","Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M","<",">"];
let count = 10;
function getRandomInt(min, max) {
    // min（最小値）と max（最大値）の間の整数を返す
    min = Math.ceil(min); // minを切り上げて整数に
    max = Math.floor(max); // maxを切り下げて整数に
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function upPassword(count){
    let add = "";
    for(var i =0;i<count;i++){
        
        add += words[getRandomInt(0,words.length - 1)]
    }
    return add
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('passmaking')
        .setDescription("The command is Only Used Manager Code\nThat stop This bot"),
    execute: async function(interaction){
        await interaction.reply(upPassword(count));
    }
}

