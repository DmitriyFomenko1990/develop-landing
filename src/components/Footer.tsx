import { GearMark } from "@/components/GearMark";
import { CONTACTS } from "@/lib/contacts";

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10">
      <div className="page-wrap flex flex-col gap-6 text-[14px] text-muted md:flex-row md:items-end md:justify-between">
        <div>
          <p className="wordmark inline-flex items-center gap-2">
            <GearMark id="mark-footer" size={16} teeth={10} className="gear-scroll-slow" />
            {CONTACTS.brand}
          </p>
          <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.071em] text-ink">
            ИП Фоменко
          </p>
          <p className="mt-2">Сайт от вида до рабочей ссылки. Одна команда.</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <a
            className="link-ghost"
            href={CONTACTS.telegramUrl}
            target="_blank"
            rel="noreferrer"
          >
            Telegram
          </a>
          <a
            className="link-ghost"
            href={CONTACTS.whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a className="link-ghost" href={CONTACTS.emailUrl}>
            {CONTACTS.email}
          </a>
          <a className="link-ghost" href="/privacy">
            Политика
          </a>
        </div>
      </div>
    </footer>
  );
}
