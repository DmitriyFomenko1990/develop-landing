import type { Metadata } from "next";
import { Inter, Oswald, Source_Serif_4 } from "next/font/google";
import { Atmosphere } from "@/components/Atmosphere";
import { CookieBanner } from "@/components/CookieBanner";
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
  title: "Делаем сайты и веб-сервисы для бизнеса",
  description:
    "От простой страницы до интернет-магазина или сложного личного кабинета. Можно прийти без готового ТЗ.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  openGraph: {
    title: "Делаем сайты и веб-сервисы для бизнеса",
    description:
      "От простой страницы до интернет-магазина или сложного личного кабинета. Можно прийти без готового ТЗ.",
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
        <CookieBanner />
      </body>
    </html>
  );
}
