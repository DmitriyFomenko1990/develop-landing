"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { easeOut } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";

const items = [
  {
    q: "Сколько стоит сайт?",
    a: [
      "Зависит от задачи и объёма работ.",
      "Простой лендинг и большой веб-сервис — это совершенно разные проекты, поэтому не хотим называть цену «от X рублей» просто для красоты.",
      "Расскажите, что нужно сделать, — после этого сможем оценить проект.",
    ],
  },
  {
    q: "Сколько занимает разработка?",
    a: [
      "Зависит от проекта.",
      "Небольшой сайт можно сделать значительно быстрее сложного сервиса с личными кабинетами и интеграциями.",
      "После обсуждения задачи скажем ориентировочные сроки.",
    ],
  },
  {
    q: "Можно прийти со своим дизайном?",
    a: [
      "Да.",
      "Можем разработать дизайн сами или работать по уже готовому макету.",
    ],
  },
  {
    q: "Можно доработать сайт, который сделали не вы?",
    a: [
      "Да, если технически это возможно.",
      "Сначала посмотрим проект и разберёмся, как он устроен. После этого скажем, что можно сделать и сколько это будет стоить.",
    ],
  },
  {
    q: "Вы работаете только с новыми проектами?",
    a: [
      "Нет.",
      "Можно прийти с существующим сайтом, который нужно исправить, ускорить, переделать или дополнить.",
    ],
  },
  {
    q: "Что нужно подготовить перед обращением?",
    a: [
      "Ничего особенного.",
      "Просто расскажите, что хотите сделать. Если у вас есть примеры сайтов, документы, техническое задание или прототип — отлично, присылайте. Но это не обязательное условие.",
    ],
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);
  const reduced = useReducedMotion();

  return (
    <section id="faq" className="px-5 py-20">
      <div className="page-wrap max-w-3xl">
        <Reveal className="text-center">
          <h2 className="display-sm">Частые вопросы</h2>
        </Reveal>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-[16px] font-semibold leading-[1.38]"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  {item.q}
                  <motion.span
                    className="bolt"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: easeOut }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key={item.q}
                      className="overflow-hidden pb-5"
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: easeOut }}
                    >
                      {item.a.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="mt-2 text-[14px] leading-[1.4] text-muted first:mt-0"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
