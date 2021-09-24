import type { UserConfig, ConfigEnv } from "vite";
import { loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { wrapperEnv } from "./build/utils";
import { resolve } from "path";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT } = viteEnv;
  return {
    plugins: [vue()],
    esbuild: {},
    resolve: {
      alias: [
        {
          find: /\/#\//,
          replacement: pathResolve("types") + "/",
        },
        {
          find: "@",
          replacement: pathResolve("src") + "/",
        },
      ],
      dedupe: ["vue"],
    },
    server: {
      host: true,
      port: VITE_PORT,
    },
  };
};
