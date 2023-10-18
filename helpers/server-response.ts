export function errorResponse(msg: string) {
  return { ok: false, msg };
}

export function dataResponse(data: Object) {
  return { ok: true, data };
}

export function successResponse(msg: string) {
  return { ok: true, msg };
}
