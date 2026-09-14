"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { GearMark } from "@/components/GearMark";
import { CONTACTS } from "@/lib/contacts";

export function Header() {
  const reduced = useReducedMotion();

  return (
    <header className="relative z-20 pt-5">
      <div className="page-wrap flex min-w-0 items-center justify-between gap-2 sm:gap-4">
        <Link href="/" className="wordmark inline-flex items-center gap-2">
          <GearMark id="mark-header" size={16} teeth={10} className="gear-scroll-slow" />
          {CONTACTS.brand}
        </Link>
        <motion.a
          href="#lead"
          className="btn-fill btn-fill-compact hidden md:inline-flex"
          whileHover={reduced ? undefined : { y: -1 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
        >
          Обсудить проект
        </motion.a>
      </div>
    </header>
  );
}
