import { chatgptResponse } from "./modules/chatgpt";
import { codeHighlight } from "./modules/codehighlight";
import { TOKEN } from "./modules/env";
import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.once("ready", () => {
	console.log("ready?");
});

client.on("messageCreate", async (message) => {
	if (message.author.bot) {
		return; // Botからのメッセージだった場合は無視
	}
	if (!client.user) {
		return;
	}
	console.log(
		`[${message.author.tag}]さんから ${message.content}と言われました`,
	);
	if (message.mentions.users.has(client.user.id)) {
		// bot宛のメンションだった場合
		const text = await chatgptResponse(message);
		message.reply(text);
	}
	if (message.content.startsWith("https://github.com/")) {
		// githubのリンクだった場合
		const code = await codeHighlight(message);
		if (code === undefined) return;
		message.channel.send(code);
	}
});

client.login(TOKEN);
