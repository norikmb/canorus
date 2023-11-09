import { Message } from 'discord.js';

export const vxTwitter = async (message: Message<boolean>) => {
  const url = message.content;
  const newUrl = url.replace('https://x.com', 'https://vxtwitter.com');
  return newUrl;
};
