export interface BasicResponseModel<T = any> {
  code: number;
  msg: string;
  data: T;
}
