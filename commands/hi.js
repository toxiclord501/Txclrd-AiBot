module.exports = {
  name: 'hi',
  description: 'Sapa balik pengguna',
  execute: async (sock, msg) => {
    await sock.sendMessage(msg.key.remoteJid, { text: 'Hai juga! Ada yang bisa saya bantu?' });
  }
};
