import https from "@/utils/https";
import { BasicResponseModel } from "@/api/base";
import { ContentType, Method } from "axios-mapper";
import qs from "qs";

export function initData(url: string, params: any) {
  return https().request<BasicResponseModel<any>>(
    url + "?" + qs.stringify(params, { indices: false }),
    Method.GET,
    params,
    ContentType.json
  );
}

export function download(url: string, params: any) {
  return https().request<BasicResponseModel<any>>(
    url + "?" + qs.stringify(params, { indices: false }),
    Method.GET,
    params,
    ContentType.json
  );
}
