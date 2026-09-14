import { connect as connectTls, type TLSSocket } from "node:tls";
import { Socket } from "node:net";

export type LeadPayload = {
  name: string;
  contact: string;
  task: string;
  project?: string;
  origin?: string;
  design?: string;
};

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function encodeSubject(value: string) {
  return `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

export function formatLeadMessage({
  name,
  contact,
  task,
  project,
  origin,
  design,
}: LeadPayload) {
  const quiz = [
    project ? `Проект: ${project}` : "",
    origin ? `Старт: ${origin}` : "",
    design ? `Дизайн: ${design}` : "",
  ].filter(Boolean);

  return [
    "Новая заявка с лендинга",
    "",
    `Имя: ${name}`,
    `Контакт: ${contact}`,
    ...(quiz.length ? ["", ...quiz] : []),
    "",
    "Сообщение:",
    task,
  ].join("\n");
}

function readReply(socket: Socket | TLSSocket) {
  return new Promise<string>((resolve, reject) => {
    let buffer = "";
    const onData = (chunk: Buffer) => {
      buffer += chunk.toString("utf8");
      const lines = buffer.split("\r\n").filter(Boolean);
      const last = lines.at(-1);
      if (last && last[3] === " ") {
        socket.off("data", onData);
        socket.off("error", onError);
        resolve(buffer);
      }
    };
    const onError = (error: Error) => {
      socket.off("data", onData);
      reject(error);
    };
    socket.on("data", onData);
    socket.on("error", onError);
  });
}

async function smtpCommand(socket: Socket | TLSSocket, command: string, ok: number[]) {
  socket.write(`${command}\r\n`);
  const reply = await readReply(socket);
  const code = Number(reply.slice(0, 3));
  if (!ok.includes(code)) {
    throw new Error(reply.trim());
  }
  return reply;
}

function upgradeTls(socket: Socket, host: string) {
  return new Promise<TLSSocket>((resolve, reject) => {
    const tlsSocket = connectTls(
      { socket, servername: host },
      () => resolve(tlsSocket),
    );
    tlsSocket.on("error", reject);
  });
}

async function sendSmtp(text: string, to: string, from: string) {
  const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!user || !pass) {
    return false;
  }

  const socket = await new Promise<Socket>((resolve, reject) => {
    const raw = new Socket();
    raw.setTimeout(12000);
    raw.once("timeout", () => {
      raw.destroy();
      reject(new Error("timeout"));
    });
    raw.connect(port, host, () => resolve(raw));
    raw.once("error", reject);
  });

  try {
    await readReply(socket);
    await smtpCommand(socket, `EHLO oknemoff.ru`, [250]);
    await smtpCommand(socket, "STARTTLS", [220]);
    const secure = await upgradeTls(socket, host);
    secure.setTimeout(12000);
    await smtpCommand(secure, `EHLO oknemoff.ru`, [250]);
    await smtpCommand(secure, "AUTH LOGIN", [334]);
    await smtpCommand(secure, Buffer.from(user).toString("base64"), [334]);
    await smtpCommand(secure, Buffer.from(pass).toString("base64"), [235]);
    await smtpCommand(secure, `MAIL FROM:<${oneLine(from)}>`, [250]);
    await smtpCommand(secure, `RCPT TO:<${oneLine(to)}>`, [250, 251]);
    await smtpCommand(secure, "DATA", [354]);
    const payload = [
      `From: ${oneLine(from)}`,
      `To: ${oneLine(to)}`,
      `Subject: ${encodeSubject("Заявка с oknemoff.ru")}`,
      "Content-Type: text/plain; charset=utf-8",
      "Content-Transfer-Encoding: 8bit",
      "",
      text,
      ".",
    ].join("\r\n");
    await smtpCommand(secure, payload, [250]);
    await smtpCommand(secure, "QUIT", [221]);
    secure.end();
    return true;
  } catch {
    socket.destroy();
    return false;
  }
}

export async function sendLeadTelegram(text: string) {
  const url = process.env.LEAD_RELAY_URL?.trim();
  const secret = process.env.LEAD_RELAY_SECRET?.trim();
  if (!url || !secret) {
    return false;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Relay-Secret": secret,
      },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(12000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export function sendLeadEmail(text: string) {
  const to = process.env.LEAD_EMAIL_TO?.trim();
  const from =
    process.env.LEAD_EMAIL_FROM?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "noreply@oknemoff.ru";
  if (!to) {
    return Promise.resolve(false);
  }
  return sendSmtp(text, to, from);
}
