export function errorResponse(msg = 'Something went wrong') {
  return { ok: false, msg };
}

export function successResponse(msg: string) {
  return { ok: true, msg };
}
