"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeUp, stagger, useMotionMount, view } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";

const steps = [
  {
    title: "Сначала разговариваем",
    text: [
      "Расскажите, что хотите сделать и зачем.",
      "Можно без технических терминов и подробного ТЗ. Нам важнее понять задачу.",
    ],
  },
  {
    title: "Потом предлагаем решение",
    text: [
      "Разберём задачу, зададим вопросы и предложим, как её лучше реализовать.",
      "Если какой-то функционал вам не нужен — не будем его придумывать просто ради увеличения сметы.",
    ],
  },
  {
    title: "Согласовываем стоимость",
    text: [
      "После того как становится понятно, что именно нужно сделать, оцениваем работу.",
      "Вы понимаете объём и стоимость до начала разработки.",
    ],
  },
  {
    title: "Делаем дизайн",
    text: [
      "Продумываем структуру и внешний вид сайта или сервиса.",
      "Показываем результат и согласовываем его с вами до того, как начинаем разработку.",
    ],
  },
  {
    title: "Разрабатываем и проверяем",
    text: [
      "Пишем код, подключаем необходимые сервисы и проверяем, как всё работает.",
      "Не только на нашем компьютере — проверяем реальные сценарии пользователя.",
    ],
  },
  {
    title: "Запускаем",
    text: [
      "Помогаем перенести проект на сервер, подключить домен и всё необходимое для запуска.",
      "После этого сайт можно использовать.",
      "А если понадобится помощь дальше — остаёмся на связи.",
    ],
  },
];

export function Process() {
  const reduced = useReducedMotion();
  const mounted = useMotionMount();

  return (
    <section id="process" className="py-14 md:py-20">
      <div className="page-wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="display-sm">Как работаем</h2>
          <p className="editorial mx-auto mt-5 max-w-xl text-muted md:mt-6">
            Без длинной цепочки подрядчиков и попыток разобраться во всём
            самостоятельно.
          </p>
        </Reveal>
        <motion.div
          className="mt-10 grid gap-x-16 md:mt-14 md:grid-cols-2"
          variants={reduced ? undefined : stagger}
          initial={mounted && !reduced ? "hidden" : false}
          whileInView="show"
          viewport={view}
        >
          {steps.map((item, index) => (
            <motion.article
              key={item.title}
              variants={reduced ? undefined : fadeUp}
              className="border-t border-line py-6 md:py-8"
            >
              <p className="eyebrow text-bronze">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-[20px] font-semibold leading-snug">
                {item.title}
              </h3>
              {item.text.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-2 max-w-md text-[14px] leading-normal text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
