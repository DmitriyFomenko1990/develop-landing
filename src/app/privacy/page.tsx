import type { Metadata } from "next";
import Link from "next/link";
import { GearMark } from "@/components/GearMark";
import { CONTACTS } from "@/lib/contacts";

export const metadata: Metadata = {
  title: "Политика обработки данных",
  description: "Как обрабатываются заявки с формы на сайте.",
};

export default function PrivacyPage() {
  return (
    <main className="page-wrap max-w-2xl px-5 py-20">
      <Link href="/" className="wordmark inline-flex items-center gap-2">
        <GearMark id="mark-privacy" size={18} teeth={10} className="gear-scroll-slow" />
        {CONTACTS.brand}
      </Link>
      <Link href="/" className="link-ghost mt-6 block text-[14px]">
        ← На главную
      </Link>
      <h1 className="display-sm mt-8">Политика обработки данных</h1>
      <div className="mt-8 space-y-4 text-[16px] leading-[1.55] text-muted">
        <p>Оператор: ИП Фоменко. Контакт: {CONTACTS.email}.</p>
        <p>
          Форма собирает имя, контакт и текст задачи, чтобы ответить на заявку.
          Данные не продаём и не используем для рассылок.
        </p>
        <p>
          Заявка уходит оператору в мессенджер. Можно написать напрямую
          в мессенджер или на почту — без формы.
        </p>
      </div>
    </main>
  );
}
