export const quizProjects = [
  "Лендинг",
  "Сайт компании",
  "Интернет-магазин",
  "Веб-сервис",
] as const;

export const quizOrigins = ["С нуля", "Уже есть что развивать"] as const;

export const quizDesigns = [
  "Дизайн есть",
  "Нужен дизайн",
  "Пока не ясно",
] as const;

export type QuizProject = (typeof quizProjects)[number];
export type QuizOrigin = (typeof quizOrigins)[number];
export type QuizDesign = (typeof quizDesigns)[number];

function pickAllowed<T extends string>(
  value: unknown,
  allowed: readonly T[],
): T | "" {
  const text = String(value ?? "").trim();
  return allowed.includes(text as T) ? (text as T) : "";
}

export function parseQuiz(body: {
  project?: unknown;
  origin?: unknown;
  design?: unknown;
}) {
  return {
    project: pickAllowed(body.project, quizProjects),
    origin: pickAllowed(body.origin, quizOrigins),
    design: pickAllowed(body.design, quizDesigns),
  };
}
