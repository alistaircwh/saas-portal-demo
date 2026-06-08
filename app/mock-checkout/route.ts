// Renders the fake gateway page. The two buttons POST to your real callback
// route (acting as the gateway's server notification), then send the browser
// to the return URL — mirroring a real iPay88 round trip.
export function GET(req: Request) {
  const url = new URL(req.url);
  const p = (k: string) => url.searchParams.get(k) ?? "";
  const ref = p("ref");
  const orderId = p("orderId");
  const amount = p("amount");
  const currency = p("currency");
  const callbackUrl = p("callbackUrl");
  const returnUrl = p("returnUrl");

  const html = `<!doctype html>
<html>
  <head><meta charset="utf-8"><title>Mock Gateway</title>
    <style>
      body{font-family:system-ui,sans-serif;max-width:420px;margin:80px auto;padding:0 20px}
      .card{border:1px solid #ddd;border-radius:12px;padding:24px}
      button{font-size:16px;padding:12px 16px;border-radius:8px;border:0;cursor:pointer;width:100%;margin-top:10px}
      .ok{background:#16a34a;color:#fff}.no{background:#dc2626;color:#fff}
      code{background:#f3f4f6;padding:2px 6px;border-radius:4px}
    </style>
  </head>
  <body>
    <div class="card">
      <h2>Mock Payment Gateway</h2>
      <p>Order <code>${orderId}</code><br>Amount <strong>${currency} ${amount}</strong></p>
      <button class="ok" onclick="pay('succeeded')">Simulate successful payment</button>
      <button class="no" onclick="pay('failed')">Simulate failed payment</button>
    </div>
    <script>
      async function pay(status){
        const body = new URLSearchParams({ ref:${JSON.stringify(ref)}, orderId:${JSON.stringify(orderId)},
          amount:${JSON.stringify(amount)}, currency:${JSON.stringify(currency)}, status });
        await fetch(${JSON.stringify(callbackUrl)}, { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body });
        window.location = ${JSON.stringify(returnUrl)};
      }
    </script>
  </body>
</html>`;

  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
}
