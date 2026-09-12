const items = [
  "Лендинг",
  "Сайт компании",
  "Магазин",
  "Кабинет",
  "Сервис",
  "Доработка",
  "Сопровождение",
];

export function Proof() {
  return (
    <section className="px-5 py-16">
      <div className="page-wrap text-center">
        <p className="eyebrow mb-8">Что обычно заказывают</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
          {items.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
