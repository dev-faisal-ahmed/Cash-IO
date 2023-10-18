export function serverReq(
  method: 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  body: Object,
) {
  return {
    method: method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
}
