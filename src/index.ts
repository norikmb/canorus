import { Client, Intents } from 'discord.js';

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.once('ready', () => {
	console.log('ready?');
});

client.on('messageCreate', async (message) => {
	if (message.author.bot) {
		return; // Botからの通信だった場合は無視
	}
	console.log(`[${message.author.tag}]さんから ${message.content}と言われました`);
	if (!client.user) {
		return;
	}
	if (message.mentions.users.has(client.user.id)) {
		message.reply('こんにちは！');
		return;
	}
});

client.login(process.env.TOKEN);
