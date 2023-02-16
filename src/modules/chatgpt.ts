import { ChatGPTAPI } from "chatgpt";
import { Message } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const api = new ChatGPTAPI({
	apiKey: process.env.OPENAI_API_KEY!,
	debug: true,
});

export const chatgptResponse = async (message: Message<boolean>) => {
	// chatGPTからレスポンスを返す
	message.channel.sendTyping(); // Promiseが解決するまで入力中...と表示させる
	const response = await api.sendMessage(message.content);
	return response.text;
};
