"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/Reveal";

export function Invite() {
  const reduced = useReducedMotion();

  return (
    <section id="invite" className="px-5 py-20">
      <div className="page-wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="display-sm">Не знаем, что именно вам нужно?</h2>
          <p className="editorial mx-auto mt-6 max-w-xl text-muted">Это нормально.</p>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-[1.45] text-muted">
            Можно просто рассказать о задаче: что сейчас не работает, что хочется
            изменить или какой результат нужен.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-[1.45] text-muted">
            Мы зададим вопросы, предложим варианты и скажем, сколько примерно
            займёт разработка.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-[1.45] text-muted">
            Если задача окажется не нашей — тоже скажем сразу.
          </p>
          <motion.a
            href="#lead"
            className="btn-fill mt-8"
            whileHover={reduced ? undefined : { y: -1 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
          >
            Обсудить проект
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
