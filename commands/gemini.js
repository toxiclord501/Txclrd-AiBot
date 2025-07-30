const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = {
  name: "gemini",
  description: "Chat dengan Gemini AI",
  async execute(sock, msg, text) {
    try {
      const prompt = text.split(" ").slice(1).join(" ");
      if (!prompt) {
        await sock.sendMessage(msg.key.remoteJid, {
          text: "⚠️ Masukkan pertanyaan setelah perintah.\nContoh: /gemini apa itu AI?",
        }, { quoted: msg });
        return;
      }

      const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const reply = response.text();

      await sock.sendMessage(msg.key.remoteJid, {
        text: reply,
      }, { quoted: msg });

    } catch (err) {
      console.error("❌ Gemini Error:", err);
      await sock.sendMessage(msg.key.remoteJid, {
        text: `❌ Gemini Error: ${err.message}`,
      }, { quoted: msg });
    }
  },
};
