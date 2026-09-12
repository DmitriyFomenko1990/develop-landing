"use client";

import { motion, useReducedMotion } from "motion/react";
import { CountUp } from "@/components/CountUp";
import { fadeUp, stagger, view } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";

const items = [
  {
    name: "Лендинг",
    value: 15000,
    text: "Одна страница: вид, сборка, выкладка на ваш адрес. Точный состав — после разговора.",
  },
  {
    name: "Разработка",
    value: 50000,
    text: "Сайт компании, магазин, сервис, подключения или доработка. Смету куска работы даём после разговора, не по двум фразам.",
  },
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
      </div>
    </section>
  );
}
