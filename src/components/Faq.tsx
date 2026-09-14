"use client";

import { motion, useReducedMotion } from "motion/react";
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
    <section id="faq" className="py-14 md:py-20">
      <div className="page-wrap max-w-3xl">
        <Reveal className="text-center">
          <h2 className="display-sm">Частые вопросы</h2>
        </Reveal>
        <div className="card-surface mt-10 divide-y divide-line overflow-hidden px-5 md:px-7">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-[16px] font-semibold leading-snug"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  {item.q}
                  <motion.span
                    className="bolt"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.3, ease: easeOut }}
                  >
                    +
                  </motion.span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-0 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="pb-5">
                      {item.a.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="mt-2 text-[14px] leading-normal text-muted first:mt-0"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
