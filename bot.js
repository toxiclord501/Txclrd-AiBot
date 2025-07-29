const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { getAIReply } = require('./openai');

const client = new Client({ authStrategy: new LocalAuth() });

client.on('qr', qr => qrcode.generate(qr, { small: true }));
client.on('ready', () => console.log('Bot siap dan online!'));

client.on('message', async msg => {
  if (msg.fromMe || !msg.body) return;
  const reply = await getAIReply(msg.body);
  msg.reply(reply);
});

client.initialize();
