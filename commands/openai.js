const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
  name: "openai",
  description: "Chat dengan OpenAI (ChatGPT)",
  async execute(sock, msg, text) {
    try {
      const prompt = text.split(" ").slice(1).join(" ");
      if (!prompt) {
        await sock.sendMessage(msg.key.remoteJid, {
          text: "⚠️ Masukkan pertanyaan setelah perintah.\nContoh: /openai apa itu AI?",
        }, { quoted: msg });
        return;
      }

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      });

      const reply = chatCompletion.choices[0].message.content.trim();
      await sock.sendMessage(msg.key.remoteJid, {
        text: reply,
      }, { quoted: msg });

    } catch (err) {
      console.error("❌ OpenAI Error:", err);
      await sock.sendMessage(msg.key.remoteJid, {
        text: `❌ OpenAI Error: ${err.message}`,
      }, { quoted: msg });
    }
  },
};
