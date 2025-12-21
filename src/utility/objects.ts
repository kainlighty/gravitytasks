export const isEmptyObject = (obj: unknown): boolean =>
  obj == null || (typeof obj === 'object' && Object.keys(obj).length === 0);