import permission from "./permission";
import type { App } from "vue";

export function setupPermission(app: App) {
  app.directive("permission", permission);
}
