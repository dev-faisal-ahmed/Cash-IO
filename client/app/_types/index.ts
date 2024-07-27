export type TServerResponse<TData> = {
  ok: boolean;
  message: string;
  data?: TData;
  error?: any;
};
