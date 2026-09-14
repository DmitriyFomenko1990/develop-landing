"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeUp, stagger, useMotionMount, view } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";

const items = [
  {
    title: "«Я не знаю, какое решение мне нужно»",
    text: [
      "И не обязательно знать.",
      "Вы рассказываете о задаче своими словами. Мы помогаем понять, какой сайт или сервис здесь действительно нужен.",
    ],
  },
  {
    title: "«Боюсь, что в процессе стоимость сильно вырастет»",
    text: [
      "Поэтому сначала разбираемся в задаче и фиксируем объём работ.",
      "Если по ходу проекта появляются новые пожелания — отдельно обсуждаем, что они меняют по срокам и стоимости.",
    ],
  },
  {
    title: "«Не хочу бесконечно согласовывать макеты»",
    text: [
      "Мы стараемся сделать так, чтобы основные решения были понятны ещё до разработки.",
      "Показываем дизайн, обсуждаем его и вносим необходимые изменения до начала программирования.",
    ],
  },
  {
    title: "«А если после запуска что-нибудь сломается?»",
    text: [
      "Поможем разобраться с проблемой.",
      "Также можем заниматься поддержкой и развитием проекта после запуска.",
    ],
  },
  {
    title: "«У меня нет нормального технического задания»",
    text: [
      "Ничего страшного.",
      "На первом этапе достаточно рассказать, что вы хотите получить. Остальное поможем сформулировать.",
    ],
  },
];

export function Pains() {
  const reduced = useReducedMotion();
  const mounted = useMotionMount();

  return (
    <section id="pains" className="py-14 md:py-20">
      <div className="page-wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="display-sm">Что обычно беспокоит перед началом</h2>
        </Reveal>
        <motion.div
          className="mt-10 grid gap-x-16 md:mt-14 md:grid-cols-2"
          variants={reduced ? undefined : stagger}
          initial={mounted && !reduced ? "hidden" : false}
          whileInView="show"
          viewport={view}
        >
          {items.map((item, index) => (
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
