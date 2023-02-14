import { ChatGPTAPI } from "chatgpt";
import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

const api = new ChatGPTAPI({
	apiKey: process.env.OPENAI_API_KEY!,
	debug: true,
});

client.once("ready", () => {
	console.log("ready?");
});

client.on("messageCreate", async (message) => {
	if (message.author.bot) {
		return; // Botからの通信だった場合は無視
	}
	console.log(
		`[${message.author.tag}]さんから ${message.content}と言われました`,
	);
	if (!client.user) {
		return;
	}
	if (message.mentions.users.has(client.user.id)) {
		// chatGPTからレスポンスを返す
		const response = await api.sendMessage(message.content);
		message.reply(response.text);
		return;
	}
	if (!message.content.startsWith("https://github.com/")) {
		return;
	}
	const url = message.content;
	const newurl = url.replace(
		/^(.*\/\/github.com\/.+\/.+\/)blob(\/.+)$/i,
		"$1raw$2",
	);
	const paragraph = url.split("#");
	if (paragraph[1] == null) {
		console.log("Where you want to display is not existing.");
		return;
	}
	(async () => {
		try {
			const res = await fetch(newurl);
			const data = await res.text();
			console.log(data);
			let sendtext = "";
			const lines = data.split("\n");
			// 拡張子を取得
			const fileType = paragraph[0]
				.split("/")
				.slice(-1)[0]
				.split(".")
				.slice(-1)[0];
			const LineNumber = paragraph[1].split("-");
			// 行始めと行終わりを取得
			if (LineNumber.length === 2) {
				const begin = Number(LineNumber[0].substring(1)) - 1;
				const end = Number(LineNumber[1].substring(1));
				console.log({ begin, end });
				sendtext = lines.slice(begin, end).join("\n");
			} else if (LineNumber.length === 1) {
				const begin = Number(LineNumber[0].substring(1)) - 1;
				sendtext = lines.slice(begin, begin + 1).join("\n");
			} else {
				console.log("error");
			}

			// テンプレートリテラル
			message.channel.send(`\`\`\`${fileType}\n${sendtext}\`\`\``);
		} catch (error) {
			console.log(error);
		}
	})();
});

client.login(process.env.TOKEN);
