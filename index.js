import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// ✅ TON VERIFY TOKEN META
const VERIFY_TOKEN = "botwhatsapp";

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook vérifié !");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ✅ Réception des messages WhatsApp
app.post("/webhook", (req, res) => {
  console.log("📩 Message WhatsApp reçu :", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Port Render
app.listen(10000, () => {
  console.log("🚀 Serveur en ligne sur le port 10000");
});
