import type { App } from "vue";

import {
  create,
  NButton,
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutContent,
  NLayoutSider,
  NH1,
  NH2,
  NH3,
  NH4,
  NH5,
  NH6,
  NIcon,
  NTooltip,
  NEmpty,
} from "naive-ui";

const naive = create({
  components: [
    NEmpty,
    NTooltip,
    NIcon,
    NLayout,
    NLayoutHeader,
    NLayoutFooter,
    NLayoutContent,
    NLayoutSider,
    NH1,
    NH2,
    NH3,
    NH4,
    NH5,
    NH6,
    NConfigProvider,
    NButton,
  ],
});

export function setupNaive(app: App<Element>) {
  app.use(naive);
}
