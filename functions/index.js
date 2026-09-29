const functions = require("firebase-functions");
const fetch = require("node-fetch");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

// Keys will come from Firebase config, NOT from code
const getConfig = () => ({
  consumerKey: functions.config().mpesa?.key || "",
  consumerSecret: functions.config().mpesa?.secret || "",
  shortcode: functions.config().mpesa?.shortcode || "174379",
  passkey: functions.config().mpesa?.passkey || ""
});

exports.mpesa = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { return res.status(204).send(''); }
  try {
    let { phone, amount } = req.body;
    if (!phone || !amount) return res.status(400).json({ error: "phone and amount required" });
    
    // Format phone 07... to 2547...
    phone = phone.toString().replace(/\s|\+/g, '');
    if (phone.startsWith('0')) phone = '254' + phone.slice(1);

    const { consumerKey, consumerSecret, shortcode, passkey } = getConfig();
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    
    const tokenRes = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', { 
      headers: { Authorization: `Basic ${auth}` } 
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) return res.status(400).json(tokenData);

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0,14);
    const password = Buffer.from(shortcode + passkey + timestamp).toString('base64');

    const stkRes = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenData.access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        BusinessShortCode: shortcode, Password: password, Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline", Amount: Math.round(amount), 
        PartyA: phone, PartyB: shortcode, PhoneNumber: phone, 
        CallBackURL: `https://us-central1-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/callback`,
        AccountReference: "VecctaPivot", TransactionDesc: "Payment"
      })
    });
    const stkData = await stkRes.json();
    if (stkData.ResponseCode == "0") {
      await db.collection("payments").add({ phone, amount: Number(amount), checkoutID: stkData.CheckoutRequestID, status: "SENT", createdAt: admin.firestore.FieldValue.serverTimestamp() });
    }
    res.json(stkData);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

exports.callback = functions.https.onRequest(async (req, res) => {
  try {
    const body = req.body?.Body?.stkCallback;
    if (!body) return res.json({ ok: true });
    const checkoutID = body.CheckoutRequestID;
    const result = body.ResultCode == 0 ? "PAID" : "FAILED";
    const snap = await db.collection("payments").where("checkoutID","==",checkoutID).get();
    snap.forEach(doc=> doc.ref.update({ status: result, callback: body, paidAt: new Date() }));
  } catch(e){ console.log(e); }
  res.json({ ok: true });
});
