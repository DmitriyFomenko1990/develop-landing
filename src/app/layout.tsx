import type { Metadata } from "next";
import { Inter, Oswald, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import { Atmosphere } from "@/components/Atmosphere";
import { GearScrollDriver } from "@/components/GearScrollDriver";
import "./globals.css";

const metrikaId = 112576002;

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
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${metrikaId}, "init", {
  clickmap:true,
  trackLinks:true,
  accurateTrackBounce:true,
  webvisor:true
});`}
        </Script>
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${metrikaId}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
