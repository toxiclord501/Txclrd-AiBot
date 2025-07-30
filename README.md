# TXCLRD-AIBot 🤖

TXCLRD-AIBot adalah bot WhatsApp modular berbasis [Baileys](https://github.com/WhiskeySockets/Baileys), dirancang untuk berjalan di Termux. Bot ini mendukung berbagai fitur AI canggih seperti auto-reply menggunakan OpenAI & Gemini, image generator, text-to-speech, voice-to-text, serta berbagai perintah lainnya yang dapat dikustomisasi.

---

## ✨ Fitur Utama

| Fitur                         | Deskripsi                                                                 |
|------------------------------|---------------------------------------------------------------------------|
| ✅ Auto-reply AI              | Balasan cerdas dari ChatGPT dan Gemini                                    |
| 🖼️ Image Generator            | Menghasilkan gambar dari prompt teks (via OpenAI DALL·E)                 |
| 🎙️ Text-to-Speech            | Mengubah teks menjadi suara (gunakan gTTS)                               |
| 🎧 Voice-to-Text              | Mengubah voice note menjadi teks otomatis (whisper API)                  |

---

## 📁 Struktur Folder

Txclrd-AiBot/ ├── commands/                # Semua perintah modular di sini │   ├── ai.js                # ChatGPT/Gemini │   ├── image.js             # Generator Gambar │   ├── tts.js               # Text to Speech │   ├── vtt.js               # Voice to Text │   ├── weather.js           # Cek cuaca │   └── ... ├── session/                 # File sesi login Baileys ├── index.js                 # File utama pemanggil bot ├── .env                     # API key disimpan di sini ├── package.json             # Info dependensi project └── README.md                # Dokumentasi ini

---

## ⚙️ Cara Instalasi di Termux

```bash
# 1. Install dependency
pkg update && pkg upgrade
pkg install nodejs git ffmpeg

# 2. Clone repo
git clone https://github.com/toxiclord501/Txclrd-AiBot
cd Txclrd-AiBot

# 3. Install node_modules
npm install

# 4. Tambahkan API Key OpenAI ke .env
echo "OPENAI_API_KEY=sk-..." > .env
echo "GEMINI_API_KEY=al-..." > .env

# 5. Jalankan bot
node index.js


---

📌 Contoh Perintah

Command	Fungsi

/hi	Tes apakah bot aktif
/gpt halo	Kirim prompt ke ChatGPT
/gemini halo	Kirim prompt ke Gemini AI
/img rumah kayu	Generate gambar dari teks
/tts selamat pagi	Mengubah teks menjadi suara
(kirim VN)	Voice Note akan otomatis diubah jadi teks
/ping	Tes respon



---

🔐 Konfigurasi API

Buat file .env di root folder, dan isi dengan:

OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GEMINI_API_KEY=al-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

---

💡 Tips Tambahan

VN (Voice Note) wajib berformat .ogg (default WhatsApp), maksimal 1 menit.

Jangan gunakan commands.js jika sudah memakai folder modular.

Kamu bisa menambahkan file baru ke folder commands/ untuk membuat fitur tambahan.

Command dapat ditulis sebagai file JavaScript modular seperti ini:


// commands/halo.js
module.exports = {
  name: 'halo',
  description: 'Balas halo',
  async execute(m, sock) {
    await sock.sendMessage(m.from, { text: 'Halo juga!' }, { quoted: m });
  }
};


---

🧪 Debug & Logging

Jika terjadi error:

Pastikan file .env sudah benar

Cek versi Node.js (minimal Node 18+ disarankan)

Jalankan dengan node index.js dan lihat log error di Termux



---

❤️ Credit

Baileys WhatsApp Library

OpenAI API

Google Text-to-Speech (gTTS)

ToxicLord501



---

📄 Lisensi

Proyek ini menggunakan lisensi MIT License.

