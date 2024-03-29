import { chatgptResponse } from './modules/chatgpt';
import { codeHighlight } from './modules/codehighlight';
import { vxTwitter } from './modules/vxtwitter';
import { TOKEN } from './modules/env';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log('ready?');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) {
    return; // Botからのメッセージだった場合は無視
  }
  if (!client.user) {
    return;
  }
  console.log(`User: [${message.author.tag}], Message: "${message.content}"`);
  if (message.mentions.users.has(client.user.id)) {
    // bot宛のメンションだった場合
    const text = await chatgptResponse(message);
    message.reply(text);
  }
  if (message.content.startsWith('https://github.com/')) {
    // githubのリンクだった場合
    const code = await codeHighlight(message);
    if (code === undefined) return;
    message.channel.send(code);
  }
  if (message.content.startsWith('https://x.com/')) {
    // xのリンクだった場合
    const post = await vxTwitter(message);
    if (post === undefined) return;
    message.channel.send(post);
  }
});

client.login(TOKEN);
