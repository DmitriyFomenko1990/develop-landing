"use client";

import { motion, useReducedMotion } from "motion/react";
import { CapabilityBoard } from "@/components/CapabilityBoard";
import { easeOut, fadeUp, stagger } from "@/lib/motion";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-x-clip pb-14 pt-8 md:pb-20 md:pt-12">

      <div className="page-wrap grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
        <motion.div
          className="relative text-center lg:text-left"
          variants={reduced ? undefined : stagger}
          initial={false}
          animate="show"
        >
          <h1 className="display max-w-xl text-balance lg:max-w-none">
            <motion.span className="block" variants={reduced ? undefined : fadeUp}>
              Делаем сайты и веб-сервисы для бизнеса
            </motion.span>
          </h1>

          <motion.p
            className="mx-auto mt-5 max-w-xl text-base leading-normal text-muted md:mt-6 lg:mx-0"
            variants={reduced ? undefined : fadeUp}
          >
            От простой страницы до интернет-магазина или сложного личного кабинета.
          </motion.p>

          <motion.p
            className="mx-auto mt-3 max-w-xl text-base leading-normal text-muted md:mt-4 lg:mx-0"
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

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: easeOut }}
        >
          <CapabilityBoard compact />
        </motion.div>
      </div>
    </section>
  );
}
