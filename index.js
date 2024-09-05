//モジュール
const dotenv = require('dotenv').config();

//COMMAND集
// const water = require('./commands/water.js');
// const fire = require('./commands/fire.js');
// const end = require('./commands/end.js');
const passmaking = require('./commands/passmaking.js');
const tekitou = require('./commands/tekitou.js');


//Client,Events,GatewayIntentBitsを　discord.jsから取得する
const {Client,Events,GatewayIntentBits} = require('discord.js');
//TOKEN取得
const {token :tk} = process.env;


//LOG記録
let nowRecording = false;
let UserRecording = [];
let TextRecording = [];
let TimeRecording = [];


const client = new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent]});
client.once(Events.ClientReady,c=>{
    console.log(`準備OKです! ${c.user.tag}がログインします。`);
});

client.on('messageCreate',message => {
    console.log("jofe")
    if(nowRecording){
        
        //console.log(channel.messages.fetch({ limit: 10 }));
    }
});

//コマンドが来たら
client.on(Events.InteractionCreate,async interaction => {
    if(!interaction.isChatInputCommand()) return;//コマンドなしで即撤退
    
    //新規
    /*
    const command = interaction.client.command.get(interaction.commandName);
    
    //一致するコマンドがない
    if(!command){
        console.error(`${interaction.commandName}というコマンドは存在しません。`);
        return;
    }

    try{
        //コマンド実行
        await command.excute(interaction);
    }catch(error){
        console.error(error);
        await interaction.reply({content:'コマンド実行中にエラーが発生しました。',ephemeral: true});
    }
    */

    


    
    //コマンド
    if (interaction.commandName === tekitou.data.name) {
        try {
            await tekitou.execute(interaction);
            
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            } else {
                await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            }
        }
    }else if(interaction.commandName === passmaking.data.name) {
        try {
            nowRecording = true;
            if(nowRecording){
                console.log("すでにnowRecordingは",nowRecording,"です");
            }   
            CheackMessage();
            //await interaction.reply(passwordMake)
            await passmaking.execute(interaction);

            //await fire.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            } else {
                await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            }
        }
    }
    
    
    //ログアウトコード うまくいってない.
    // else if(interaction.commandName === end.data.name) {
    //     try {
    //         nowRecording = false;            
    //         await fire.execute(interaction);
    //         client.logout(tk);
    //     } catch (error) {
    //         console.error(error);
    //         if (interaction.replied || interaction.deferred) {
    //             await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
    //         } else {
    //             await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
    //         }
    //     }
    // }
    else {
        console.error(`${interaction.commandName}というコマンドには対応していません。`);
    }
});

client.on("READ_MESSAGE_HISTORY" ,info=>{
    console.log(client.info.message);
})

client.on('messageCreate', message => {
    // Bot自身のメッセージを無視する
    if (message.author.bot) return;

    // メッセージの内容をコンソールに表示する
    //user名 = message.author.tag
    //text message.content
    
    UserRecording[UserRecording.length] = String(message.author.tag);
    TextRecording[TextRecording.length] = String(message.content);
    var t = new Date()
    TimeRecording[TimeRecording.length] = t.toLocaleString("ja");

    //user : text time
    console.log(`${message.author.tag}: ${message.content} ${t.toLocaleString("ja")}`);

});

function CheackMessage(){
    for(var i = 0;i<UserRecording.length;i++){
        console.log(TimeRecording[i],UserRecording[i],TextRecording[i]);    
    }
}


client.login(tk);