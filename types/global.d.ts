import type { PropType as VuePropType } from "vue";

declare global {
  type PropType<T> = VuePropType<T>;

  declare type Nullable<T> = T | null;
  declare type Recordable<T = any> = Record<string, T>;

  declare interface ViteEnv {
    VITE_PORT: number;
  }
}
