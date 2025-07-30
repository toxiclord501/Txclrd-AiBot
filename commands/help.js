const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'help',
  description: 'Tampilkan semua perintah',
  execute: async (sock, msg) => {
    const commandFiles = fs.readdirSync(path.join(__dirname)).filter(file => file.endsWith('.js'));
    let helpMessage = '*Daftar perintah:*\n\n';
    for (const file of commandFiles) {
      const command = require(`./${file}`);
      helpMessage += `• *${command.name}* - ${command.description}\n`;
    }
    await sock.sendMessage(msg.key.remoteJid, { text: helpMessage });
  }
};
