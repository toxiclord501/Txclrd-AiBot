require('dotenv').config(); // ini WAJIB di paling atas

const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
  name: 'image',
  description: 'Generate gambar dari prompt teks',
  async execute(sock, m, args, fullMessage) {
    const prompt = args.join(' ');
    if (!prompt) {
      return sock.sendMessage(m.key.remoteJid, {
        text: '❗ Masukkan prompt gambar.\nContoh: /image astronot naik becak di bulan'
      }, { quoted: m });
    }

    try {
      const response = await openai.images.generate({
        model: 'dall-e-3', // atau 'dall-e-2' jika tidak punya akses
        prompt: prompt,
        n: 1,
        size: '1024x1024'
      });

      const imageUrl = response.data[0].url;

      await sock.sendMessage(m.key.remoteJid, {
        image: { url: imageUrl },
        caption: `🖼️ Gambar untuk: "${prompt}"`
      }, { quoted: m });

    } catch (err) {
      console.error('❌ Gagal generate gambar:', err);
      await sock.sendMessage(m.key.remoteJid, {
        text: '⚠️ Terjadi kesalahan saat generate gambar dari OpenAI.'
      }, { quoted: m });
    }
  }
};
