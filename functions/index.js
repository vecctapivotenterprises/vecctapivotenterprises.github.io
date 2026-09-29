const functions = require("firebase-functions");
const fetch = require("node-fetch");
const admin = require("firebase-admin");
admin.initializeApp();

exports.mpesa = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(204).send(''); return; }
  try {
    const { phone, amount } = req.body;
    const consumerKey = "SVQp6vV7Ld99sQ4zH9pXSir6p64EjRVMNMAPaDTpII0wFiaN";
    const consumerSecret = "edT44CXdsSB7STT6SLAD30MVXy7AqFQ7ttUtn5x0puztR5HEgGQRKS75GCYc4oni";
    const shortcode = "174379";
    const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenRes = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', { headers: { Authorization: `Basic ${auth}` } });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) return res.status(400).json(tokenData);
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0,14);
    const password = Buffer.from(shortcode + passkey + timestamp).toString('base64');
    const stkRes = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenData.access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        BusinessShortCode: shortcode, Password: password, Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline", Amount: amount, PartyA: phone, PartyB: shortcode,
        PhoneNumber: phone, CallBackURL: "https://us-central1-vecctapivot-enterprises.cloudfunctions.net/callback",
        AccountReference: "VecctaPivot", TransactionDesc: "Payment"
      })
    });
    const stkData = await stkRes.json();
    if (stkData.ResponseCode == "0") {
      await admin.firestore().collection("payments").add({ phone, amount: Number(amount), checkoutID: stkData.CheckoutRequestID, status: "SENT", createdAt: new Date() });
    }
    res.json(stkData);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

exports.callback = functions.https.onRequest(async (req, res) => {
  try {
    const body = req.body.Body.stkCallback;
    const checkoutID = body.CheckoutRequestID;
    const result = body.ResultCode == 0 ? "PAID" : "FAILED";
    await admin.firestore().collection("payments").where("checkoutID","==",checkoutID).get().then(snap=>{ snap.forEach(doc=> doc.ref.update({ status: result, callback: body, paidAt: new Date() })) });
  } catch(e){ console.log(e); }
  res.json({ ok: true });
});
