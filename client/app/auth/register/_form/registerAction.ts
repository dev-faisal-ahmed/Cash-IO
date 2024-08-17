import { apiUrl } from '@/app/_data';
import { fetchOption } from '@/app/_utils/helpers';

type TPayload = {
  name: string;
  email: string;
  password: string;
};

export const registerAction = async (payload: TPayload) => {
  const response = await fetch(
    apiUrl.register,
    fetchOption({ method: 'POST', body: payload }),
  );

  const responseData = await response.json();
  return responseData;
};
