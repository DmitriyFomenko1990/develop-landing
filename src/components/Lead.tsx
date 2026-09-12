"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FormEvent, useState } from "react";
import { CONTACTS } from "@/lib/contacts";
import { easeOut } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";

type Status = "idle" | "sending" | "done" | "error";

const fieldClass = "field";

export function Lead() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        contact: data.get("contact"),
        task: data.get("task"),
      }),
    });

    const payload = (await response.json()) as {
      ok?: boolean;
      error?: string;
      fallback?: boolean;
      telegramUrl?: string;
    };

    if (!response.ok || !payload.ok) {
      setStatus("error");
      setError(payload.error ?? "Не получилось отправить");
      return;
    }

    if (payload.fallback && payload.telegramUrl) {
      window.open(payload.telegramUrl, "_blank", "noopener,noreferrer");
    }

    form.reset();
    setStatus("done");
  }

  return (
    <section id="lead" className="px-5 py-20">
      <div className="page-wrap grid gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Написать</p>
          <h2 className="display-sm mt-4">
            Напишите, что нужно — разберёмся и скажем, с чего начать.
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-[1.38] text-muted">
            Ответим в мессенджере. Можно сразу написать туда или на почту,
            без формы.
          </p>
          <div className="mt-8 flex flex-col gap-3 text-[14px]">
            <a
              className="link-ghost w-fit"
              href={CONTACTS.telegramUrl}
              target="_blank"
              rel="noreferrer"
            >
              Telegram @oknemof
            </a>
            <a
              className="link-ghost w-fit"
              href={CONTACTS.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp +7 988 953-77-71
            </a>
            <a className="link-ghost w-fit" href={CONTACTS.emailUrl}>
              {CONTACTS.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form onSubmit={onSubmit} className="card-surface p-6">
            <div className="mb-5 flex items-center gap-2">
              <span className="lamp lamp-on" />
              <span className="lamp" />
              <span className="lamp lamp-on" />
            </div>
            <label className="block text-[12px] font-semibold uppercase tracking-[0.071em] text-muted">
              Имя
              <input
                name="name"
                required
                minLength={2}
                maxLength={80}
                className={fieldClass}
              />
            </label>
            <label className="mt-4 block text-[12px] font-semibold uppercase tracking-[0.071em] text-muted">
              Мессенджер, телефон или почта
              <input
                name="contact"
                required
                minLength={3}
                maxLength={120}
                className={fieldClass}
              />
            </label>
            <label className="mt-4 block text-[12px] font-semibold uppercase tracking-[0.071em] text-muted">
              Что нужно сделать
              <textarea
                name="task"
                required
                minLength={8}
                maxLength={2000}
                rows={5}
                className={`${fieldClass} resize-y`}
              />
            </label>
            <motion.button
              type="submit"
              disabled={status === "sending"}
              className="btn-fill mt-6 w-full cursor-pointer disabled:opacity-60"
              whileHover={reduced ? undefined : { opacity: 0.88 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
            >
              {status === "sending" ? "Отправляем…" : "Написать, что нужно"}
            </motion.button>
            <p className="mt-4 text-[12px] leading-relaxed text-subtle">
              Отправляя форму, вы соглашаетесь на обработку данных, чтобы вам
              ответили.{" "}
              <a className="link-ghost" href="/privacy">
                Политика
              </a>
            </p>
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.p
                  key="done"
                  className="mt-4 text-[14px] text-bronze"
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                >
                  Заявка ушла. Если открылся мессенджер — отправьте черновик.
                </motion.p>
              ) : null}
              {status === "error" ? (
                <motion.p
                  key="error"
                  className="mt-4 text-[14px] text-bronze"
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                >
                  {error}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
