"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeUp, stagger, view } from "@/lib/motion";
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

  return (
    <section id="capabilities" className="px-5 py-20">
      <div className="page-wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="display-sm">Что можем сделать</h2>
          <p className="editorial mx-auto mt-6 max-w-xl text-muted">
            Не обязательно заранее знать, какой именно сайт вам нужен.
            Расскажите, чего хотите добиться, а мы предложим подходящий вариант.
          </p>
        </Reveal>
        <motion.div
          className="mt-14 grid gap-x-16 md:grid-cols-2"
          variants={reduced ? undefined : stagger}
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={view}
        >
          {services.map((item, index) => (
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
