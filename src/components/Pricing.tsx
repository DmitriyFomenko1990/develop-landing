"use client";

import { motion, useReducedMotion } from "motion/react";
import { CountUp } from "@/components/CountUp";
import { fadeUp, stagger, view } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";

const items = [
  {
    name: "Лендинг",
    value: 15000,
    text: "Одна страница под услугу или акцию: форма, выкладка на ваш домен. Точный состав — после разбора.",
  },
  {
    name: "Разработка",
    value: 50000,
    text: "Сайт компании, магазин, сервис или доработка. Смету этапа даём после разбора, не по двум фразам.",
  },
];

const refused = [
  "Tilda, WordPress, Bitrix «под ключ»",
  "Срок «вчера» и дешёвый фикс без разбора",
  "Долгая поддержка чужого кода без нормального входа",
];

export function Pricing() {
  const reduced = useReducedMotion();

  return (
    <section id="pricing" className="px-5 py-20">
      <div className="page-wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Ориентир</p>
          <h2 className="display-sm mt-4">
            Ориентир по цене, не счёт за любой объём.
          </h2>
        </Reveal>
        <motion.div
          className="mt-12 grid gap-4 md:grid-cols-2"
          variants={reduced ? undefined : stagger}
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={view}
        >
          {items.map((item) => (
            <motion.article
              key={item.name}
              variants={reduced ? undefined : fadeUp}
              className="card-surface panel-shift p-6"
            >
              <p className="eyebrow">{item.name}</p>
              <p className="display-sm mt-4">
                <CountUp to={item.value} prefix="от " suffix=" ₽" />
              </p>
              <p className="mt-4 text-[14px] leading-[1.4] text-muted">
                {item.text}
              </p>
            </motion.article>
          ))}
        </motion.div>
        <Reveal delay={0.08}>
          <div className="card-surface mt-6 p-6">
            <p className="eyebrow">Не берём</p>
            <ul className="mt-5 space-y-3 text-[14px] leading-[1.4] text-ink">
              {refused.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
