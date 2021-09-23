import type {App} from 'vue';


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
} from 'naive-ui'

const naive = create({
  components: [
    NLayout,
    NLayoutHeader,
    NLayoutFooter,
    NLayoutContent,
    NLayoutSider,
    NH1,
    NH2,
    NConfigProvider,
    NButton
  ]
})

export function setupNaive(app: App<Element>) {
  app.use(naive);
}
