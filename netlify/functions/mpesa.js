exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const { phone, amount } = JSON.parse(event.body);
    
    // YOUR REAL SANDBOX KEYS
    const consumerKey = "SVQp6vV7Ld99sQ4zH9pXSir6p64EjRVMNMAPaDTpII0wFiaN";
    const consumerSecret = "edT44CXdsSB7STT6SLAD30MVXy7AqFQ7ttUtn5x0puztR5HEgGQRKS75GCYc4oni";
    const shortcode = "174379";
    const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";

    // 1. Get Access Token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenRes = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: { Authorization: `Basic ${auth}` }
    });
    const tokenData = await tokenRes.json();
    
    if (!tokenData.access_token) {
      return { statusCode: 400, body: JSON.stringify({ error: "Failed to get token", details: tokenData }) };
    }

    // 2. STK Push
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0,14);
    const password = Buffer.from(shortcode + passkey + timestamp).toString('base64');

    const stkRes = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${tokenData.access_token}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: shortcode,
        PhoneNumber: phone,
        CallBackURL: "https://vecctapivotenterprises.co.ke/api/callback",
        AccountReference: "VecctaPivot",
        TransactionDesc: "Payment for Veccta Pivot"
      })
    });

    const stkData = await stkRes.json();
    return { 
      statusCode: 200, 
      body: JSON.stringify(stkData) 
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
