import { NextResponse } from "next/server";
import { telegramDraftUrl } from "@/lib/contacts";
import { formatLeadMessage, sendLeadEmail } from "@/lib/lead";

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
        { ok: false, error: "Укажите мессенджер, телефон или почту" },
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
    const emailed = await sendLeadEmail(text);
    if (emailed) {
      return NextResponse.json({ ok: true, fallback: false });
    }

    return NextResponse.json({
      ok: true,
      fallback: true,
      telegramUrl: telegramDraftUrl(text),
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Не получилось отправить. Напишите в мессенджер." },
      { status: 500 },
    );
  }
}
