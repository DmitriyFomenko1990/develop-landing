"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Script from "next/script";
import { useEffect, useState } from "react";
import { easeOut } from "@/lib/motion";
import {
  METRIKA_ID,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

export function CookieBanner() {
  const reduced = useReducedMotion();
  const [choice, setChoice] = useState<ConsentChoice | "unknown" | "">("");

  useEffect(() => {
    setChoice(readConsent() || "unknown");
  }, []);

  function decide(next: ConsentChoice) {
    writeConsent(next);
    setChoice(next);
  }

  return (
    <>
      {choice === "accepted" ? (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${METRIKA_ID}, "init", {
  clickmap:true,
  trackLinks:true,
  accurateTrackBounce:true,
  webvisor:true
});`}
        </Script>
      ) : null}

      <AnimatePresence>
        {choice === "unknown" ? (
          <motion.div
            role="dialog"
            aria-label="Согласие на cookie"
            className="fixed inset-x-0 bottom-0 z-40 px-5 pb-5"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 12 }}
            transition={{ duration: 0.45, ease: easeOut }}
          >
            <div className="page-wrap rounded-[22px] border border-line bg-surface p-5 shadow-[var(--shadow-panel)] md:flex md:items-center md:justify-between md:gap-8">
              <p className="max-w-xl text-[14px] leading-[1.4] text-muted">
                На сайте cookie и Яндекс Метрика — чтобы понять, как им
                пользуются. Заявку это не меняет.{" "}
                <a className="link-ghost" href="/privacy">
                  Политика
                </a>
              </p>
              <div className="mt-4 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
                <button
                  type="button"
                  className="link-ghost cursor-pointer text-[12px] font-semibold uppercase tracking-[0.071em]"
                  onClick={() => decide("denied")}
                >
                  Отклонить
                </button>
                <button
                  type="button"
                  className="btn-fill cursor-pointer px-5 py-2.5 text-[12px]"
                  onClick={() => decide("accepted")}
                >
                  Принять
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
