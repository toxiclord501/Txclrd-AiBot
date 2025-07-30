require('dotenv').config();

module.exports = {
  name: 'owner',
  description: 'Menampilkan nomor owner bot',
  async execute(sock, msg) {
    const owner = process.env.OWNER_NUMBER || 'Owner belum disetel di .env';
    await sock.sendMessage(msg.key.remoteJid, { text: `👤 Owner: wa.me/${owner.replace('@s.whatsapp.net', '')}` }, { quoted: msg });
  },
};
