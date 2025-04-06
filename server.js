const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const TELEGRAM_API = "https://api.telegram.org/bot7635408983:AAHrM9l9mXMYMrX6K6IP_my1tR-gHCmADBM";
const PORT = 3000;

app.post('/callback', async (req, res) => {
  const { callback_query } = req.body;
  if (!callback_query) return res.sendStatus(200);

  const chatId = callback_query.message.chat.id;
  const messageId = callback_query.message.message_id;
  const refId = callback_query.data;

  // Edit pesan Telegram
  await fetch(`${TELEGRAM_API}/editMessageCaption`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      caption: `REF: ${refId}\nStatus: Pembayaran Telah Dikonfirmasi`
    })
  });

  console.log("Pembayaran Dikonfirmasi:", refId);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server aktif di http://localhost:${PORT}`);
});
