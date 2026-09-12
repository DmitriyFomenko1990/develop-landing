"use client";

import { motion, useReducedMotion } from "motion/react";
import { CONTACTS } from "@/lib/contacts";
import { Reveal } from "@/components/Reveal";

const facts = [
  { title: "Витрина", text: "Каталог и корзина под именем продавца" },
  { title: "Заявки", text: "В кабинет и в Telegram" },
  { title: "Адрес", text: "easybrandhub.ru — можно открыть сейчас" },
];

export function Case() {
  const reduced = useReducedMotion();

  return (
    <section id="case" className="px-5 py-20">
      <div className="page-wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Пример</p>
          <h2 className="display-sm mt-4">
            EasyBrand — магазин, который уже можно открыть.
          </h2>
          <p className="editorial mx-auto mt-6 max-w-xl text-muted">
            Живой продукт, не макет. Продавец получает витрину под своим именем —
            каталог, корзина, заявки в кабинет и Telegram.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <motion.a
            href={CONTACTS.easybrandUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Открыть пример EasyBrand"
            className="card-surface panel-shift mt-12 block overflow-hidden"
            whileHover={reduced ? undefined : { y: -2 }}
          >
            <div className="grid md:grid-cols-[1.15fr_0.85fr]">
              <div className="p-6 md:p-8">
                <p className="eyebrow text-bronze">можно открыть</p>
                <p className="mt-5 max-w-xl text-[16px] leading-[1.38] text-muted">
                  Так выглядит работа, которую отдаём по адресу. Не конструктор
                  и не витрина на чужой площадке.
                </p>
                <ul className="mt-8 space-y-4">
                  {facts.map((fact) => (
                    <li key={fact.title} className="border-t border-line pt-4">
                      <p className="text-[14px] font-semibold text-ink">
                        {fact.title}
                      </p>
                      <p className="mt-1 text-[13px] text-muted">{fact.text}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.071em] text-ink">
                  easybrandhub.ru →
                </p>
              </div>
              <div className="flex flex-col justify-between border-t border-line p-6 md:border-l md:border-t-0 md:p-8">
                <div>
                  <p className="eyebrow">Пример</p>
                  <p className="mt-4 font-display text-[48px] font-black leading-none tracking-[0.014em]">
                    свой
                    <br />
                    магазин
                  </p>
                </div>
                <p className="mt-10 text-[14px] leading-[1.4] text-muted">
                  Ещё делали витрины с заказами, обучение в вебе, финансовые
                  кабинеты. Названия по договорам не публикуем.
                </p>
              </div>
            </div>
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
