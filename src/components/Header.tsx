"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { GearMark } from "@/components/GearMark";
import { CONTACTS } from "@/lib/contacts";

export function Header() {
  const reduced = useReducedMotion();

  return (
    <header className="relative z-20 px-5 pt-5">
      <div className="page-wrap flex items-center justify-between gap-4">
        <Link href="/" className="wordmark inline-flex items-center gap-2">
          <GearMark id="mark-header" size={18} teeth={10} className="gear-scroll-slow" />
          {CONTACTS.brand}
        </Link>
        <motion.a
          href="#lead"
          className="btn-fill px-4 py-2.5 text-[11px] md:px-5 md:text-[12px]"
          whileHover={reduced ? undefined : { y: -1 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
        >
          Обсудить проект
        </motion.a>
      </div>
    </header>
  );
}
