"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FormEvent, useState } from "react";
import { CONTACTS } from "@/lib/contacts";
import { easeOut } from "@/lib/motion";
import {
  quizDesigns,
  quizOrigins,
  quizProjects,
  type QuizDesign,
  type QuizOrigin,
  type QuizProject,
} from "@/lib/quiz";
import { Reveal } from "@/components/Reveal";

type Status = "idle" | "sending" | "done" | "error";

const fieldClass = "field";

const questions = [
  {
    key: "project" as const,
    title: "Что нужно сделать?",
    options: quizProjects,
  },
  {
    key: "origin" as const,
    title: "С чего начинаем?",
    options: quizOrigins,
  },
  {
    key: "design" as const,
    title: "Есть ли дизайн?",
    options: quizDesigns,
  },
];

export function Lead() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [project, setProject] = useState<QuizProject | "">("");
  const [origin, setOrigin] = useState<QuizOrigin | "">("");
  const [design, setDesign] = useState<QuizDesign | "">("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [task, setTask] = useState("");

  const answers = { project, origin, design };

  function resetForm() {
    setStep(0);
    setProject("");
    setOrigin("");
    setDesign("");
    setName("");
    setContact("");
    setTask("");
  }

  function onChoose(key: (typeof questions)[number]["key"], value: string) {
    setStatus("idle");
    setError("");
    if (key === "project") setProject(value as QuizProject);
    if (key === "origin") setOrigin(value as QuizOrigin);
    if (key === "design") setDesign(value as QuizDesign);
    setStep((current) => Math.min(current + 1, 3));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        contact,
        task,
        project,
        origin,
        design,
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

    resetForm();
    setStatus("done");
  }

  const question = questions[step];

  return (
    <section id="lead" className="px-5 py-20">
      <div className="page-wrap grid gap-12 lg:grid-cols-2">
        <Reveal>
          <h2 className="display-sm">Есть задача?</h2>
          <p className="mt-6 max-w-md text-[16px] leading-[1.45] text-muted">
            Расскажите о ней своими словами.
          </p>
          <p className="mt-4 max-w-md text-[16px] leading-[1.45] text-muted">
            Необязательно знать технические термины, иметь готовое ТЗ или точно
            понимать, какой сайт вам нужен.
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
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2" aria-hidden>
                {[0, 1, 2, 3].map((index) => (
                  <span
                    key={index}
                    className={index <= step ? "lamp lamp-on" : "lamp"}
                  />
                ))}
              </div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.071em] text-muted">
                {step + 1} / 4
              </p>
            </div>

            <AnimatePresence mode="wait">
              {question ? (
                <motion.div
                  key={question.key}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                >
                  <p className="text-[16px] font-semibold leading-[1.38]">
                    {question.title}
                  </p>
                  <div className="mt-4 grid gap-2">
                    {question.options.map((option) => {
                      const selected = answers[question.key] === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          className={`cursor-pointer rounded-[18px] border px-4 py-3 text-left text-[14px] leading-[1.35] ${
                            selected
                              ? "border-bronze text-ink"
                              : "border-line text-muted"
                          }`}
                          aria-pressed={selected}
                          onClick={() => onChoose(question.key, option)}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="contacts"
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                >
                  <label className="block text-[12px] font-semibold uppercase tracking-[0.071em] text-muted">
                    Имя
                    <input
                      name="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      minLength={2}
                      maxLength={80}
                      className={fieldClass}
                    />
                  </label>
                  <label className="mt-4 block text-[12px] font-semibold uppercase tracking-[0.071em] text-muted">
                    Контакты
                    <input
                      name="contact"
                      value={contact}
                      onChange={(event) => setContact(event.target.value)}
                      required
                      minLength={3}
                      maxLength={120}
                      className={fieldClass}
                    />
                  </label>
                  <label className="mt-4 block text-[12px] font-semibold uppercase tracking-[0.071em] text-muted">
                    Сообщение
                    <textarea
                      name="task"
                      value={task}
                      onChange={(event) => setTask(event.target.value)}
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
                    {status === "sending" ? "Отправляем…" : "Обсудить проект"}
                  </motion.button>
                  <p className="mt-4 text-[12px] leading-relaxed text-subtle">
                    Отправляя форму, вы соглашаетесь на обработку данных, чтобы вам
                    ответили.{" "}
                    <a className="link-ghost" href="/privacy">
                      Политика
                    </a>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {step > 0 ? (
              <button
                type="button"
                className="link-ghost mt-5 cursor-pointer text-[12px] font-semibold uppercase tracking-[0.071em]"
                onClick={() => {
                  setStatus("idle");
                  setStep((current) => Math.max(current - 1, 0));
                }}
              >
                Назад
              </button>
            ) : null}

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
