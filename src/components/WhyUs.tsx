"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeUp, stagger, view } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";

const items = [
  {
    title: "Одна команда",
    text: "Пишете в одно место. Не собираете дизайнера, разработку и запуск по отдельности.",
  },
  {
    title: "Сначала стоимость",
    text: "Оцениваем задачу и договариваемся о работах до того, как начнём разработку.",
  },
  {
    title: "Дизайн до кода",
    text: "Сначала вид и согласование. Разработку начинаем, когда понятно, что делаем.",
  },
  {
    title: "Можно остаться",
    text: "После запуска — поддержка и развитие, если это нужно. Если нет — передаём проект.",
  },
];

export function WhyUs() {
  const reduced = useReducedMotion();

  return (
    <section id="why" className="px-5 py-20">
      <div className="page-wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="display-sm">Почему мы</h2>
        </Reveal>
        <motion.div
          className="mt-14 grid gap-x-16 md:grid-cols-2"
          variants={reduced ? undefined : stagger}
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={view}
        >
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              variants={reduced ? undefined : fadeUp}
              className="border-t border-line py-8"
            >
              <p className="eyebrow text-bronze">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-[20px] font-semibold leading-[1.33]">
                {item.title}
              </h3>
              <p className="mt-2 max-w-md text-[14px] leading-[1.4] text-muted">
                {item.text}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
