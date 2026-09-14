"use client";

import { motion, useReducedMotion } from "motion/react";
import { GearMark } from "@/components/GearMark";
import { fadeUp, stagger } from "@/lib/motion";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-x-clip pb-14 pt-10 md:pb-24 md:pt-20">
      <div className="horizon" aria-hidden />

      <motion.div
        className="page-wrap relative flex flex-col items-center text-center"
        variants={reduced ? undefined : stagger}
        initial={false}
        animate="show"
      >
        <div className="hero-cogs hidden xl:block" aria-hidden>
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

        <h1 className="display max-w-5xl text-balance">
          <motion.span className="block" variants={reduced ? undefined : fadeUp}>
            Делаем сайты и веб-сервисы для бизнеса
          </motion.span>
        </h1>

        <motion.p
          className="mt-5 max-w-2xl text-base leading-normal text-muted md:mt-6"
          variants={reduced ? undefined : fadeUp}
        >
          От простой страницы до интернет-магазина или сложного личного кабинета.
        </motion.p>

        <motion.p
          className="mt-3 max-w-2xl text-base leading-normal text-muted md:mt-4"
          variants={reduced ? undefined : fadeUp}
        >
          Поможем разобраться с задачей, спроектируем, разработаем и запустим.
          Можно прийти даже без готового ТЗ — разберёмся вместе.
        </motion.p>

        <motion.a
          href="#lead"
          className="btn-fill mt-7 md:mt-8"
          variants={reduced ? undefined : fadeUp}
          whileHover={reduced ? undefined : { y: -1 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
        >
          Обсудить проект
        </motion.a>
      </motion.div>
    </section>
  );
}
