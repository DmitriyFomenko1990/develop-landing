"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/Reveal";

export function Invite() {
  const reduced = useReducedMotion();

  return (
    <section id="invite" className="py-14 md:py-20">
      <div className="page-wrap">
        <Reveal>
          <div className="card-surface mx-auto max-w-3xl px-6 py-10 text-center md:px-12 md:py-14">
            <h2 className="display-sm">Не знаем, что именно вам нужно?</h2>
            <p className="editorial mx-auto mt-5 max-w-xl text-muted md:mt-6">Это нормально.</p>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-normal text-muted">
              Можно просто рассказать о задаче: что сейчас не работает, что хочется
              изменить или какой результат нужен.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-normal text-muted">
              Мы зададим вопросы, предложим варианты и скажем, сколько примерно
              займёт разработка.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-normal text-muted">
              Если задача окажется не нашей — тоже скажем сразу.
            </p>
            <motion.a
              href="#lead"
              className="btn-fill mt-7 md:mt-8"
              whileHover={reduced ? undefined : { y: -1 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
            >
              Обсудить проект
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
