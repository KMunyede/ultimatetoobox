import { AppContent } from "./types";
import { ultimate3DCheckers } from "./ultimate-3d-checkers";

export const APPS_REGISTRY: AppContent[] = [
  ultimate3DCheckers,
];

export function getAllApps(): AppContent[] {
  return APPS_REGISTRY;
}

export function getApp(slug: string): AppContent | undefined {
  return APPS_REGISTRY.find((app) => app.slug === slug);
}
