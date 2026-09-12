"use client";

import { motion, useReducedMotion } from "motion/react";
import { Gauge } from "@/components/Gauge";
import { SectionBreak } from "@/components/SectionBreak";
import { fadeUp, stagger, view } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";

const services = [
  {
    title: "Лендинг под заявки",
    text: "Одна страница под одну услугу или акцию. Чтобы с рекламы или ссылки вам написали.",
  },
  {
    title: "Сайт компании",
    text: "Несколько экранов: кто вы, что делаете, как написать. Чтобы не объяснять себя в каждом чате.",
  },
  {
    title: "Магазин и кабинет",
    text: "Каталог, корзина, заявки у вас. Когда одной страницы уже мало.",
  },
  {
    title: "Сервис",
    text: "Роли, сценарии, интеграции. От схемы экранов до адреса, который открывается.",
  },
];

const steps = [
  {
    title: "Пишете задачу",
    text: "Даже «нужна страница». Чем яснее цель — заявки, витрина, кабинет — тем точнее ориентир.",
  },
  {
    title: "Называем этап",
    text: "Цена и срок куска работы. Не «сайт целиком» по двум фразам.",
  },
  {
    title: "Показываем ход",
    text: "Экраны и промежуточный результат. Вы видите, что происходит, не ждёте сюрприза.",
  },
  {
    title: "Открываем на домене",
    text: "Проверяем вместе: страница открывается и заявка доходит.",
  },
];

const owned = [
  {
    title: "Код",
    text: "Исходники у вас. Другой разработчик сможет войти без нашей платформы.",
  },
  {
    title: "Домен",
    text: "Адрес оформлен на вас. Ссылку можно отправить клиенту.",
  },
  {
    title: "Заявки",
    text: "Форма и Telegram — входящие приходят вам, не в наш кабинет.",
  },
  {
    title: "Один чат",
    text: "Пишете в одно место. Не собираете верстальщика, дизайнера и «того парня с Тильды».",
  },
];

export function Features() {
  const reduced = useReducedMotion();

  return (
    <>
      <section id="capabilities" className="px-5 py-20">
        <div className="page-wrap">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Что делаем</p>
            <h2 className="display-sm mt-4">Сначала страница, с которой пишут.</h2>
            <p className="editorial mx-auto mt-6 max-w-xl text-muted">
              Лендинг или сайт компании — основной запрос. Магазин и сервис берём,
              когда страница уже не закрывает задачу.
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

      <SectionBreak id="break-process" kind="clockwork" />

      <section id="process" className="px-5 py-20">
        <div className="page-wrap">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Как идём</p>
            <h2 className="display-sm mt-4">Сначала разбор, потом срок и цена.</h2>
            <p className="editorial mx-auto mt-6 max-w-xl text-muted">
              Не фиксируем большой объём по двум фразам. После короткого разбора
              называем этап — и делаем его.
            </p>
          </Reveal>
          <motion.div
            className="mt-14 grid gap-x-16 md:grid-cols-2"
            variants={reduced ? undefined : stagger}
            initial={reduced ? false : "hidden"}
            whileInView="show"
            viewport={view}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={reduced ? undefined : fadeUp}
                className="flex items-start gap-5 border-t border-line py-8"
              >
                <Gauge value={(index + 1) * 25} label={String(index + 1).padStart(2, "0")} />
                <div>
                  <h3 className="mt-1 text-[20px] font-semibold leading-[1.33]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[14px] leading-[1.4] text-muted">
                    {step.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionBreak id="break-owned" kind="thick" />

      <section className="px-5 py-20">
        <div className="page-wrap">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Что остаётся у вас</p>
            <h2 className="display-sm mt-4">Сайт ваш. Не аренда платформы.</h2>
            <p className="editorial mx-auto mt-6 max-w-xl text-muted">
              Тильду, WordPress и Bitrix «под ключ» не берём. Делаем так, чтобы
              код и адрес можно было забрать.
            </p>
          </Reveal>
          <motion.div
            className="mt-14 grid gap-x-16 md:grid-cols-2"
            variants={reduced ? undefined : stagger}
            initial={reduced ? false : "hidden"}
            whileInView="show"
            viewport={view}
          >
            {owned.map((item) => (
              <motion.article
                key={item.title}
                variants={reduced ? undefined : fadeUp}
                className="border-t border-line py-8"
              >
                <h3 className="text-[20px] font-semibold leading-[1.33]">
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
    </>
  );
}
