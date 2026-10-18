import { AppContent } from "./types";
import { twenty48GrandMasters } from "./twenty48";
import { ultimate3DCheckers } from "./ultimate-3d-checkers";
import { ultimateTicTacToe } from "./ultimate-tic-tac-toe";

export const APPS_REGISTRY: AppContent[] = [
  ultimate3DCheckers,
  ultimateTicTacToe,
  twenty48GrandMasters,
];

export function getAllApps(): AppContent[] {
  return APPS_REGISTRY;
}

export function getApp(slug: string): AppContent | undefined {
  return APPS_REGISTRY.find((app) => app.slug === slug);
}
