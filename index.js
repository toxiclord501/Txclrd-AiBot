require("dotenv").config();

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");
const pino = require("pino");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const path = require("path");
const commandHandler = require("./commands"); // Folder modular
const prefix = "/";
const ownerNumber = process.env.OWNER_NUMBER?.replace(/\D/g, "") + "@s.whatsapp.net";

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    auth: state,
    version,
    connectTimeoutMs: 180_000, // 3 menit
  });

  // QR Handler
  sock.ev.on("connection.update", async (update) => {
    const { connection, qr, lastDisconnect } = update;

    if (qr) {
      console.log("📲 Scan QR ini untuk login (berlaku 3 menit):");
      qrcode.generate(qr, { small: true });
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.statusCode || lastDisconnect?.statusCode;

      console.log("❌ Koneksi terputus. Menyambung ulang...");
      connectToWhatsApp();
    } else if (connection === "open") {
      console.log("✅ Bot berhasil terhubung!");
    }
  });

  // Handler pesan masuk
  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;

    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const sender = msg.key.participant || msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

    if (!text || !text.startsWith(prefix)) return;

    // Hanya izinkan owner
    if (sender !== ownerNumber) {
      console.log(`⛔ Diblokir: Bukan owner (${sender})`);
      return;
    }

    const commandName = text.slice(1).split(" ")[0].toLowerCase();
    const command = commandHandler[commandName];
    const args = text.trim().split(" ").slice(1);

    if (command) {
      try {
	await command.execute(sock, msg, text, args);
      } catch (err) {
        console.error("❌ Error saat eksekusi command:", err);
        await sock.sendMessage(sender, { text: `❌ Error: ${err.message}` }, { quoted: msg });
      }
    }
  });

  sock.ev.on("creds.update", saveCreds);
}

connectToWhatsApp();
