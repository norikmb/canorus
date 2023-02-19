import { OPENAI_API_KEY } from "./env";
import { ChatGPTAPI } from "chatgpt";
import { Message } from "discord.js";

const api = new ChatGPTAPI({
	apiKey: OPENAI_API_KEY,
	debug: true,
});

export const chatgptResponse = async (message: Message<boolean>) => {
	const question = message.content.replace(/<@[0-9]{18}>/g, "");  //ユーザー名は送信しない
	message.channel.sendTyping();  // Promiseが解決するまで入力中...と表示させる
	const response = await api.sendMessage(question);  // chatGPTからレスポンスを返す
	return response.text;
};
