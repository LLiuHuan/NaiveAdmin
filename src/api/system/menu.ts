import { getAppEnvConfig } from "@/utils/env";
import https from "@/utils/https";
import { BasicResponseModel } from "@/api/base";
import { ContentType, Method } from "axios-mapper";

const { VITE_GLOB_API_URL_PREFIX } = getAppEnvConfig();

/**
 * @description: 获取菜单
 */
export function build(params: any = {}) {
  return https().request<BasicResponseModel>(
    `${VITE_GLOB_API_URL_PREFIX}/v1/menu/build`,
    Method.GET,
    params,
    ContentType.json
  );
}
