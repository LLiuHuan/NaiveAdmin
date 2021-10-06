import https from "@/utils/https";
import { ContentType, Method } from "axios-mapper";
import { getAppEnvConfig } from "@/utils/env";
import { BasicResponseModel } from "@/api/base";

const { VITE_GLOB_API_URL_PREFIX } = getAppEnvConfig();

/**
 * @description: 用户登录
 */
export function login(params: any) {
  return https().request<BasicResponseModel>(
    `${VITE_GLOB_API_URL_PREFIX}/v1/auth/login`,
    Method.POST,
    params,
    ContentType.json
  );
}
