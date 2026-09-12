"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { GearMark } from "@/components/GearMark";
import { CONTACTS } from "@/lib/contacts";

const links = [
  { href: "#capabilities", label: "Что делаем" },
  { href: "#process", label: "Как идём" },
  { href: "#case", label: "Пример" },
  { href: "#pricing", label: "Цены" },
];

export function Header() {
  const reduced = useReducedMotion();

  return (
    <header className="relative z-20 px-5 pt-5">
      <div className="page-wrap flex items-center justify-between gap-4">
        <Link href="/" className="wordmark inline-flex items-center gap-2">
          <GearMark id="mark-header" size={18} teeth={10} className="gear-scroll-slow" />
          {CONTACTS.brand}
        </Link>
        <nav className="hidden md:flex">
          <div className="nav-rail">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="nav-link py-1.5">
                {link.label}
              </a>
            ))}
          </div>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={CONTACTS.telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-text hidden md:inline-flex"
          >
            Написать
          </a>
          <motion.a
            href="#lead"
            className="btn-fill px-4 py-2.5 text-[11px] md:px-5 md:text-[12px]"
            whileHover={reduced ? undefined : { y: -1 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
          >
            Получить разбор
          </motion.a>
        </div>
      </div>
    </header>
  );
}
