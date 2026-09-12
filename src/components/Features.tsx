"use client";

import { motion, useReducedMotion } from "motion/react";
import { Gauge } from "@/components/Gauge";
import { SectionBreak } from "@/components/SectionBreak";
import { fadeUp, stagger, view } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";

const services = [
  {
    title: "Лендинг",
    text: "Одна страница под одну услугу или акцию. От вида до ссылки, которую можно открыть.",
  },
  {
    title: "Сайт компании",
    text: "Несколько экранов: кто вы, что делаете, как связаться. Чтобы не объяснять себя в каждом чате.",
  },
  {
    title: "Магазин и кабинет",
    text: "Каталог, корзина, заявки у вас. Когда одной страницы уже мало.",
  },
  {
    title: "Сервис",
    text: "Разные роли и сценарии. От схемы экранов до адреса, который открывается.",
  },
  {
    title: "Подключения",
    text: "Мессенджеры, уведомления, боты, связь с другими сервисами и системами — если это нужно задаче.",
  },
  {
    title: "С нуля или дальше",
    text: "Можно начать с пустого листа или развить то, что уже есть. Состав смотрим по задаче.",
  },
];

const steps = [
  {
    title: "Пишете задачу",
    text: "Даже «нужен сайт». Чем яснее цель, тем точнее скажем, с чего начать.",
  },
  {
    title: "Выбираем вид",
    text: "Поможем решить, как сайт будет выглядеть. Если есть примеры, которые нравятся — пришлите.",
  },
  {
    title: "Собираем и показываем",
    text: "Видите ход работы, не ждёте сюрприза в конце.",
  },
  {
    title: "Открываем ссылку",
    text: "Проверяем вместе: сайт открывается, сообщения доходят до вас.",
  },
];

const owned = [
  {
    title: "Файлы сайта",
    text: "Можно отдать другому человеку без нашей площадки.",
  },
  {
    title: "Адрес",
    text: "Оформлен на вас. Ссылку можно отправить клиенту.",
  },
  {
    title: "Сообщения",
    text: "Форма и мессенджеры — входящие приходят вам, не к нам в кабинет.",
  },
  {
    title: "Один чат",
    text: "Пишете в одно место. Не собираете отдельно, кто нарисует, кто соберёт и кто выложит.",
  },
];

export function Features() {
  const reduced = useReducedMotion();

  return (
    <>
      <section id="capabilities" className="px-5 py-20">
        <div className="page-wrap">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Что берём на себя</p>
            <h2 className="display-sm mt-4">Не ищете подрядчиков по частям.</h2>
            <p className="editorial mx-auto mt-6 max-w-xl text-muted">
              Одна команда берёт задачу с нуля и ведёт до открытия адреса.
              Страницы, подключения к другим сервисам, уведомления и боты —
              если это нужно задаче.
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
            <p className="eyebrow">Как делаем</p>
            <h2 className="display-sm mt-4">Сначала разберёмся, потом соберём и откроем.</h2>
            <p className="editorial mx-auto mt-6 max-w-xl text-muted">
              Пишете своими словами. Вместе выбираем вид и состав страниц.
              Потом собираем и открываем ссылку.
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
            <h2 className="display-sm mt-4">Сайт ваш. Адрес и файлы остаются у вас.</h2>
            <p className="editorial mx-auto mt-6 max-w-xl text-muted">
              Ссылку можно отправить клиенту. Файлы можно забрать и отдать
              другому человеку.
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
