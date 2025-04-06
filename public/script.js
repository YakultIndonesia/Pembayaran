const apiKey = "7635408983:AAHrM9l9mXMYMrX6K6IP_my1tR-gHCmADBM";
const groupId = "-1002450527687";

const now = new Date();
const refId = `REF${now.getFullYear().toString().slice(-2)}${now.getMonth()+1}${now.getDate()}${now.getSeconds()}${now.getHours()}${now.getMinutes()}JONG`;

document.getElementById("refText").textContent = "REF ID: " + refId;

async function kirimBukti() {
  const file = document.getElementById("buktiInput").files[0];
  if (!file) return alert("Pilih gambar bukti!");

  const formData = new FormData();
  formData.append("photo", file);
  formData.append("caption", `REF: ${refId}\nKeterangan: Menunggu konfirmasi`);
  formData.append("chat_id", groupId);
  formData.append("parse_mode", "HTML");

  const keyboard = {
    inline_keyboard: [[{
      text: "Konfirmasi Pembayaran",
      callback_data: refId
    }]]
  };
  formData.append("reply_markup", JSON.stringify(keyboard));

  const res = await fetch(`https://api.telegram.org/bot${apiKey}/sendPhoto`, {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  if (data.ok) {
    alert("Bukti terkirim. Menunggu konfirmasi admin...");
  } else {
    alert("Gagal kirim bukti.");
  }
}
