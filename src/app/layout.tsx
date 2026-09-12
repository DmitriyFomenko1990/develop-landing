import type { Metadata } from "next";
import { Inter, Oswald, Source_Serif_4 } from "next/font/google";
import { Atmosphere } from "@/components/Atmosphere";
import { GearScrollDriver } from "@/components/GearScrollDriver";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
});

const display = Oswald({
  variable: "--font-display-face",
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
});

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Сайт целиком — от идеи до открытия",
  description:
    "Одна команда: поможем выбрать вид, соберём сайт и откроем по вашей ссылке. Лендинг от 15 000 ₽, разработка от 50 000 ₽.",
  openGraph: {
    title: "Сайт целиком — от идеи до открытия",
    description:
      "Не нужно искать отдельно, кто нарисует, кто соберёт и кто выложит. Пишете нам — ведём до рабочей ссылки. Лендинг от 15 000 ₽, разработка от 50 000 ₽.",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      data-theme="ember"
      className={`${sans.variable} ${display.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas text-ink">
        <GearScrollDriver />
        <Atmosphere />
        {children}
      </body>
    </html>
  );
}
