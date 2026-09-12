"use client";

import { motion, useReducedMotion } from "motion/react";
import { CapabilityBoard } from "@/components/CapabilityBoard";
import { GearMark } from "@/components/GearMark";
import { fadeUp, stagger } from "@/lib/motion";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-5 pb-8 pt-14 md:pb-12 md:pt-20">
      <div className="horizon" aria-hidden />

      <motion.div
        className="page-wrap relative flex flex-col items-center text-center"
        variants={reduced ? undefined : stagger}
        initial={reduced ? false : "hidden"}
        animate="show"
      >
        <motion.p
          className="mb-8 text-[14px] text-muted"
          variants={reduced ? undefined : fadeUp}
        >
          Лендинг от 15 000 ₽
          {" — "}
          <span className="text-ink">разработка от 50 000 ₽</span>
        </motion.p>

        <h1 className="display max-w-4xl">
          <motion.span className="block" variants={reduced ? undefined : fadeUp}>
            Сайт, с которого пишут.
          </motion.span>
          <motion.span className="block" variants={reduced ? undefined : fadeUp}>
            На вашем домене.
          </motion.span>
        </h1>

        <motion.p
          className="mt-6 max-w-150 text-base leading-[1.38] text-muted"
          variants={reduced ? undefined : fadeUp}
        >
          Соберём лендинг или сайт компании: форма, Telegram, адрес, который
          можно открыть и отправить. Код остаётся у вас — не аренда конструктора.
        </motion.p>

        <motion.a
          href="#lead"
          className="btn-fill mt-8"
          variants={reduced ? undefined : fadeUp}
          whileHover={reduced ? undefined : { y: -1 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
        >
          Получить разбор
        </motion.a>

        <motion.p
          className="mt-4 max-w-md text-[14px] leading-[1.4] text-subtle"
          variants={reduced ? undefined : fadeUp}
        >
          Напишете задачу — ответим и назовём ориентир по цене и сроку этапа.
        </motion.p>

        <motion.p
          className="eyebrow mt-14"
          variants={reduced ? undefined : fadeUp}
        >
          Что уходит к вам на запуске
        </motion.p>

        <motion.div
          className="relative mt-6 w-full"
          variants={reduced ? undefined : fadeUp}
        >
          <div className="hero-cogs hidden lg:block" aria-hidden>
            <GearMark
              id="hero-left"
              size={88}
              kind="clockwork"
              className="hero-cog-left gear-scroll"
            />
            <GearMark
              id="hero-right"
              size={64}
              kind="thick"
              className="hero-cog-right gear-scroll-rev"
            />
          </div>
          <CapabilityBoard />
        </motion.div>
      </motion.div>
    </section>
  );
}
