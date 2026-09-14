"use client";

import { motion, useReducedMotion } from "motion/react";
import { CONTACTS } from "@/lib/contacts";
import { Reveal } from "@/components/Reveal";

export function Case() {
  const reduced = useReducedMotion();

  return (
    <section id="case" className="px-5 py-20">
      <div className="page-wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <motion.a
            href={CONTACTS.easybrandUrl}
            target="_blank"
            rel="noreferrer"
            className="block"
            whileHover={reduced ? undefined : { y: -2 }}
          >
            <h2 className="display-sm">EasyBrand — пример нашего проекта.</h2>
            <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.071em] text-ink">
              easybrandhub.ru →
            </p>
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
