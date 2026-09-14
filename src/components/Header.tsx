"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { GearMark } from "@/components/GearMark";
import { CONTACTS } from "@/lib/contacts";

const links = [
  { href: "#capabilities", label: "Что можем сделать" },
  { href: "#process", label: "Как работаем" },
  { href: "#lead", label: "Есть задача?" },
];

export function Header() {
  const reduced = useReducedMotion();

  return (
    <header className="site-header">
      <div className="page-wrap">
        <div className="nav-rail">
          <Link href="/" className="wordmark inline-flex items-center gap-2">
            <GearMark
              id="mark-header"
              size={16}
              teeth={10}
              className="gear-scroll-slow"
            />
            {CONTACTS.brand}
          </Link>
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Разделы">
            {links.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>
          <motion.a
            href="#lead"
            className="btn-fill btn-fill-compact"
            whileHover={reduced ? undefined : { y: -1 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
          >
            Обсудить проект
          </motion.a>
        </div>
      </div>
    </header>
  );
}
