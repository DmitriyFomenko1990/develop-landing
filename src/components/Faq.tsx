"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { easeOut } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";

const items = [
  {
    q: "Можно заказать только лендинг?",
    a: "Да. Одна страница — нормальный первый этап. Магазин или сервис берём, если страница уже не справляется.",
  },
  {
    q: "Это Тильда или конструктор?",
    a: "Нет. Свой код на вашем домене. Tilda, WordPress и Bitrix «под ключ» не берём.",
  },
  {
    q: "Что будет после заявки?",
    a: "Ответим и зададим пару вопросов. Потом назовём цену и срок этапа. Если задача не наша — скажем сразу.",
  },
  {
    q: "Почему цена «от»?",
    a: "15 000 ₽ — простой лендинг. 50 000 ₽ — нижняя граница разработки. Точную сумму не называем по двум фразам.",
  },
  {
    q: "Кто делает работу?",
    a: "Команда. Пишете в одно место — не собираете подрядчиков сами.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);
  const reduced = useReducedMotion();

  return (
    <section className="px-5 py-20">
      <div className="page-wrap max-w-3xl">
        <Reveal className="text-center">
          <p className="eyebrow">Вопросы</p>
          <h2 className="display-sm mt-4">Частые вопросы до заявки</h2>
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
                    <motion.p
                      key={item.q}
                      className="overflow-hidden pb-5 text-[14px] leading-[1.4] text-muted"
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: easeOut }}
                    >
                      {item.a}
                    </motion.p>
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
