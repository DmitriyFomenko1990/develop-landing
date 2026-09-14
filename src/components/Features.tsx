"use client";

import { motion, useReducedMotion } from "motion/react";
import { easeOut, fadeUp, stagger, useMotionMount, view } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";

const services = [
  {
    title: "Лендинг",
    text: "Если нужно быстро и понятно рассказать о продукте, услуге или предложении и привести человека к заявке.",
  },
  {
    title: "Сайт компании",
    text: "Расскажем о компании, услугах и продуктах так, чтобы посетителю было понятно, чем вы занимаетесь и что делать дальше.",
  },
  {
    title: "Интернет-магазин",
    text: "Каталог, карточки товаров, корзина, оформление заказа, личный кабинет и всё остальное, что нужно для продаж.",
  },
  {
    title: "Веб-сервис",
    text: "Если обычного сайта недостаточно. Личные кабинеты, разные роли пользователей, сложная логика, расчёты и другие нестандартные задачи.",
  },
  {
    title: "Доработка существующего сайта",
    text: "Не всегда нужно всё переделывать. Посмотрим, что уже есть, найдём слабые места и предложим, что действительно стоит изменить.",
  },
  {
    title: "Интеграции",
    text: "Подключим CRM, Telegram, почту, платёжные системы, внешние сервисы и API.",
  },
];

export function Features() {
  const reduced = useReducedMotion();
  const mounted = useMotionMount();

  return (
    <section id="capabilities" className="py-14 md:py-20">
      <div className="page-wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="display-sm">Что можем сделать</h2>
        </Reveal>
        <motion.div
          className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 xl:grid-cols-3"
          variants={reduced ? undefined : stagger}
          initial={mounted && !reduced ? "hidden" : false}
          whileInView="show"
          viewport={view}
        >
          {services.map((item, index) => (
            <motion.article
              key={item.title}
              variants={reduced ? undefined : fadeUp}
              className="card-surface panel-shift p-6 pt-7"
              whileHover={
                reduced ? undefined : { y: -4, transition: { duration: 0.25, ease: easeOut } }
              }
              whileTap={reduced ? undefined : { scale: 0.99 }}
            >
              <p className="eyebrow text-bronze">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-[20px] font-semibold leading-snug">
                {item.title}
              </h3>
              <p className="mt-2 text-[14px] leading-normal text-muted">
                {item.text}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
