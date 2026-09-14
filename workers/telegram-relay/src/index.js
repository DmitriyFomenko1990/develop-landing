export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const secret = request.headers.get("x-relay-secret") ?? "";
    if (!env.RELAY_SECRET || secret !== env.RELAY_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }

    let text = "";
    try {
      const body = await request.json();
      text = String(body?.text ?? "").trim();
    } catch {
      return new Response("Bad Request", { status: 400 });
    }

    if (text.length < 8 || text.length > 4000) {
      return new Response("Bad Request", { status: 400 });
    }

    const token = env.TELEGRAM_BOT_TOKEN;
    const chatId = env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return new Response("Not Configured", { status: 500 });
    }

    const telegram = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
      },
    );

    if (!telegram.ok) {
      return new Response("Bad Gateway", { status: 502 });
    }

    return Response.json({ ok: true });
  },
};
