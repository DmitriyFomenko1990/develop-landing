"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FormEvent, useEffect, useState } from "react";
import { CONTACTS } from "@/lib/contacts";
import { easeOut, useMotionMount } from "@/lib/motion";
import {
  quizDesigns,
  quizOrigins,
  quizProjects,
  type QuizDesign,
  type QuizOrigin,
  type QuizProject,
} from "@/lib/quiz";
import { Reveal } from "@/components/Reveal";

type Status = "idle" | "sending" | "error";

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
  const mounted = useMotionMount();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const [step, setStep] = useState(0);
  const [project, setProject] = useState<QuizProject | "">("");
  const [origin, setOrigin] = useState<QuizOrigin | "">("");
  const [design, setDesign] = useState<QuizDesign | "">("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [task, setTask] = useState("");

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = window.setTimeout(() => setToast(false), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

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
    setStatus("idle");
    setToast(true);
  }

  const question = questions[step];

  return (
    <section id="lead" className="py-14 md:py-20">
      <div className="page-wrap grid gap-10 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <h2 className="display-sm">Есть задача?</h2>
          <p className="mt-5 max-w-md text-[16px] leading-normal text-muted md:mt-6">
            Расскажите о ней своими словами.
          </p>
          <p className="mt-4 max-w-md text-[16px] leading-normal text-muted">
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
          <form onSubmit={onSubmit} className="card-surface instrument">
            <div className="instrument-head">
              <div className="flex min-h-11 min-w-0 items-center gap-3">
                {step > 0 ? (
                  <button
                    type="button"
                    className="link-ghost cursor-pointer text-[12px] font-semibold uppercase tracking-[0.071em]"
                    onClick={() => {
                      setStatus("idle");
                      setStep((current) => Math.max(current - 1, 0));
                    }}
                  >
                    ← Назад
                  </button>
                ) : null}
                <span className="lamp lamp-on" />
                <p className="truncate text-[12px] font-semibold text-ink">
                  {question ? question.title : "Есть задача?"}
                </p>
              </div>
              <div className="quiz-steps" aria-hidden>
                {[0, 1, 2, 3].map((index) => (
                  <span
                    key={index}
                    className={index <= step ? "quiz-dot quiz-dot-on" : "quiz-dot"}
                  />
                ))}
              </div>
            </div>

            <div className="p-5 md:p-6">
              <AnimatePresence mode="wait">
              {question ? (
                <motion.div
                  key={question.key}
                  initial={mounted && !reduced ? { opacity: 0, y: 8 } : false}
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
                          className={`quiz-option cursor-pointer border px-4 py-3.5 text-left text-[14px] leading-snug ${
                            selected ? "quiz-option-on" : "border-line text-muted"
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
                  initial={mounted && !reduced ? { opacity: 0, y: 8 } : false}
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
                      autoComplete="name"
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
                      autoComplete="on"
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
                    <a
                      className="link-ghost"
                      href="/privacy"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Политика
                    </a>
                  </p>
                </motion.div>
              )}
              </AnimatePresence>

              {status === "error" ? (
                <p className="mt-4 text-[14px] text-bronze">{error}</p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>

      <AnimatePresence>
        {toast ? (
          <motion.div
            key="lead-toast"
            className="toast-float pointer-events-none fixed inset-x-0 z-50 flex justify-center px-5"
            initial={reduced ? false : { opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <p role="status" className="toast-plate">
              Заявка отправлена
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
