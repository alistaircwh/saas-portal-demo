import { prisma } from "@/lib/prisma";

// Customer-facing return page (iPay88 "ResponseURL").
// iPay88 redirects the shopper's browser here with a POST after payment, so we
// must accept POST as well as GET (a refresh / direct hit). This page is only
// the visual receipt — the authoritative payment state is set by the
// server-to-server BackendURL (/api/payments/callback). We read the order
// status from our own DB rather than trusting the redirect params.

async function render(orderId: string | null) {
  let heading = "Thank you";
  let message =
    "We've received your payment request. You'll get an activation email once it's confirmed — this usually only takes a moment.";

  if (orderId) {
    const order = await prisma.order
      .findUnique({ where: { id: orderId } })
      .catch(() => null);

    if (order?.status === "paid") {
      heading = "Payment successful";
      message =
        "Your subscription is being activated. Check your email for the activation QR code and instructions.";
    } else if (order?.status === "cancelled" || order?.status === "expired") {
      heading = "Payment not completed";
      message =
        "Your payment didn't go through. No charge was made. Please try again or contact us on WhatsApp and we'll help.";
    }
  }

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${heading} — Vigilant Asia</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: grid; place-items: center;
    background: #080808; color: #fafafa;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    padding: 24px;
  }
  .card {
    max-width: 460px; width: 100%; text-align: center;
    background: #111016; border: 1px solid rgba(250,250,250,0.08);
    border-radius: 16px; padding: 40px 32px;
  }
  h1 { font-size: 1.5rem; margin: 0 0 12px; }
  p { color: rgba(250,250,250,0.7); line-height: 1.6; margin: 0 0 28px; }
  a.btn {
    display: inline-block; text-decoration: none;
    background: #C41E1E; color: #fff; font-weight: 600;
    padding: 12px 24px; border-radius: 10px;
  }
  .brand { color: #C41E1E; font-weight: 700; letter-spacing: 0.02em; margin-bottom: 24px; }
</style>
</head>
<body>
  <div class="card">
    <div class="brand">VIGILANT ASIA</div>
    <h1>${heading}</h1>
    <p>${message}</p>
    <a class="btn" href="/">Back to home</a>
  </div>
</body>
</html>`;
}

function htmlResponse(body: string) {
  return new Response(body, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export async function GET(req: Request) {
  const orderId = new URL(req.url).searchParams.get("orderId");
  return htmlResponse(await render(orderId));
}

export async function POST(req: Request) {
  // iPay88 posts form-encoded fields; we also accept ?orderId= on the URL.
  let orderId = new URL(req.url).searchParams.get("orderId");
  try {
    const form = await req.formData();
    orderId = orderId ?? (form.get("orderId")?.toString() || null);
  } catch {
    // No form body — fall back to query param.
  }
  return htmlResponse(await render(orderId));
}
