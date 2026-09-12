export type LeadPayload = {
  name: string;
  contact: string;
  task: string;
};

export function formatLeadMessage({ name, contact, task }: LeadPayload) {
  return [
    "Новая заявка с лендинга",
    "",
    `Имя: ${name}`,
    `Контакт: ${contact}`,
    "",
    "Задача:",
    task,
  ].join("\n");
}
