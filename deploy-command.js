// discord.js v14では、下記のようにRESTとRoutesはdiscord.jsパッケージから直接インポートできます
const { REST, Routes } = require('discord.js');

// hey.jsのmodule.exportsを呼び出します。
const passMaking = require('./commands/passmaking.js');
const tekitouMaking = require('./commands/tekitou.js');

// 環境変数としてapplicationId, guildId, tokenの3つが必要です
//const { applicationId, guildId, token } = require('./config.json');
const dotenv = require('dotenv').config();

const { token: t } = process.env;
const { application: ap} = process.env;
const { gildId: gldID} = process.env;


// 登録コマンドを呼び出してリスト形式で登録
const commands = [tekitouMaking.data.toJSON(),passMaking.data.toJSON()];

// DiscordのAPIには現在最新のversion10を指定
const rest = new REST({ version: '10' }).setToken(t);

// Discordサーバーにコマンドを登録
(async () => {
    try {
        await rest.put(
			Routes.applicationGuildCommands(ap, gldID),
			{ body: commands },
		);
        console.log('サーバー固有のコマンドが登録されました！');
    } catch (error) {
        console.error('コマンドの登録中にエラーが発生しました:', error);
    }
})();