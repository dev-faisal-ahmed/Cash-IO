// ****************** Utility Types ****************** \\

export type TServerResponse<TData> = {
  ok: boolean;
  message: string;
  data?: TData;
  error?: any;
};

// ****************** User Types ****************** \\
export type TProvider = 'CREDENTIALS' | 'GOOGLE';
export type TUser = {
  _id: string;
  email: string;
  password?: string;
  imageUrl?: string;
  name: string;
  budget?: number;
  provider: TProvider;
};
