import { Gauge } from "@/components/Gauge";

const nav = [
  { label: "Вид", on: true },
  { label: "Страницы", on: false },
  { label: "Сборка", on: false },
  { label: "Ссылка", on: false },
  { label: "Дальше", on: false },
];

const feed = [
  {
    title: "Вид сайта",
    meta: "Поможем выбрать, как будет выглядеть",
    state: "вместе",
  },
  {
    title: "Страницы",
    meta: "Кто вы, что предлагаете, как с вами связаться",
    state: "собираем",
  },
  {
    title: "Сборка",
    meta: "Показываем по ходу, не в последний день",
    state: "в работе",
  },
  {
    title: "Рабочая ссылка",
    meta: "Можно открыть и отправить клиенту",
    state: "открываем",
  },
  {
    title: "Подключения",
    meta: "Другие сервисы, уведомления, боты — если нужно",
    state: "по задаче",
  },
];

const chips = ["Вид", "Сборка", "Ссылка", "Мессенджеры", "Уведомления", "Боты"];

export function CapabilityBoard() {
  return (
    <div className="card-surface overflow-hidden text-left">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="lamp lamp-on" />
          <div>
            <p className="text-[12px] font-semibold text-ink">Что входит</p>
            <p className="mt-0.5 text-[11px] text-subtle">От вида до рабочей ссылки</p>
          </div>
        </div>
        <p className="eyebrow hidden sm:inline-flex">одна команда</p>
      </div>

      <div className="grid min-h-105 lg:grid-cols-[200px_1fr_240px]">
        <aside className="hidden border-r border-line p-5 lg:block">
          <p className="eyebrow">Шаги</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li
                key={item.label}
                className={`flex items-center gap-2 text-[13px] ${item.on ? "font-semibold text-ink" : "text-muted"}`}
              >
                <span className={item.on ? "lamp lamp-on" : "lamp"} />
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        <div className="p-5">
          <p className="eyebrow">На старте</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {chips.map((chip, index) => (
              <li key={chip} className={index === 0 ? "chip chip-on" : "chip"}>
                {chip}
              </li>
            ))}
          </ul>
          <ul className="mt-5">
            {feed.map((row, index) => (
              <li
                key={row.title}
                className={`flex items-start justify-between gap-4 py-3.5 ${
                  index < feed.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <div>
                  <p className="text-[14px] font-semibold text-ink">{row.title}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted">
                    {row.meta}
                  </p>
                </div>
                <span className="shrink-0 pt-0.5 text-[11px] uppercase tracking-[0.06em] text-bronze">
                  {row.state}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="hidden border-l border-line p-5 lg:block">
          <p className="eyebrow">Ход</p>
          <div className="mt-5 grid grid-cols-1 gap-4">
            <Gauge value={92} label="Вид" />
            <Gauge value={88} label="Сборка" />
            <Gauge value={76} label="Ссылка" />
          </div>
        </aside>
      </div>
    </div>
  );
}
