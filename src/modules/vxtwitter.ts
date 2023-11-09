import { Message } from "discord.js";

export const vxTwitter = async (message: Message<boolean>) => {
	const url = new URL(message.content);
	const vxtwitterDomain = "https://vxtwitter.com";
	url.hostname = vxtwitterDomain;
	return url.href;
};
