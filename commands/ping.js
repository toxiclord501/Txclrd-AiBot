module.exports = {
  name: 'ping',
  description: 'Tes respons bot',
  execute: async (sock, msg) => {
    await sock.sendMessage(msg.key.remoteJid, { text: 'Pong!' });
  }
};
