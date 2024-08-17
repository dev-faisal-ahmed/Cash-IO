type TFetchOption = {
  method: 'POST' | 'PATCH' | 'GET' | 'DELETE';
  body?: any;
};

export const fetchOption = ({ method, body }: TFetchOption) => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
    body: JSON.stringify(body),
  };
};
