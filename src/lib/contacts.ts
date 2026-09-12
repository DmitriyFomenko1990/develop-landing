export const CONTACTS = {
  brand: "OKNEMOFF",
  telegramUser: "oknemof",
  telegramUrl: "https://t.me/oknemof",
  whatsappUrl: "https://wa.me/79889537771",
  email: "fomenkodmitriy1990@gmail.com",
  emailUrl: "mailto:fomenkodmitriy1990@gmail.com",
  easybrandUrl: "https://easybrandhub.ru",
} as const;

export function telegramDraftUrl(text: string) {
  return `${CONTACTS.telegramUrl}?text=${encodeURIComponent(text)}`;
}
