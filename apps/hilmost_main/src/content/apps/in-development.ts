export interface InDevelopmentItem {
  readonly name: string;
  readonly kind: "game" | "app";
}

export const IN_DEVELOPMENT_ITEMS: readonly InDevelopmentItem[] = [
  { name: "Ultimate Driver", kind: "game" },
  { name: "Ultimate Twenty48", kind: "game" },
  { name: "Ultimate Tetris", kind: "game" },
  { name: "Space Rangers", kind: "game" },
  { name: "Daily Stoic", kind: "app" },
  { name: "BMI & Health", kind: "app" },
  { name: "Link Audit", kind: "app" },
  { name: "Disk Cleanup Tool", kind: "app" },
] as const;

export function getInDevelopmentGames(): string[] {
  return IN_DEVELOPMENT_ITEMS.filter((item) => item.kind === "game").map((item) => item.name);
}

export function getInDevelopmentApps(): string[] {
  return IN_DEVELOPMENT_ITEMS.filter((item) => item.kind === "app").map((item) => item.name);
}
