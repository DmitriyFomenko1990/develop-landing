import { NextResponse } from "next/server";
import { telegramDraftUrl } from "@/lib/contacts";
import { formatLeadMessage } from "@/lib/lead";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: unknown;
      contact?: unknown;
      task?: unknown;
    };

    const name = String(body.name ?? "").trim();
    const contact = String(body.contact ?? "").trim();
    const task = String(body.task ?? "").trim();

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json(
        { ok: false, error: "Укажите имя" },
        { status: 400 },
      );
    }
    if (contact.length < 3 || contact.length > 120) {
      return NextResponse.json(
        { ok: false, error: "Укажите Telegram, телефон или почту" },
        { status: 400 },
      );
    }
    if (task.length < 8 || task.length > 2000) {
      return NextResponse.json(
        { ok: false, error: "Опишите задачу чуть подробнее" },
        { status: 400 },
      );
    }

    const text = formatLeadMessage({ name, contact, task });
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json({
        ok: true,
        fallback: true,
        telegramUrl: telegramDraftUrl(text),
      });
    }

    const telegramResponse = await fetch(
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

    if (!telegramResponse.ok) {
      return NextResponse.json({
        ok: true,
        fallback: true,
        telegramUrl: telegramDraftUrl(text),
      });
    }

    return NextResponse.json({ ok: true, fallback: false });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Не получилось отправить. Напишите в мессенджер." },
      { status: 500 },
    );
  }
}
