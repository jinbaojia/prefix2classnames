function isObject(param: unknown) {
  return typeof param === 'object';
}
export function isPlainObject(value: unknown): value is object {
  if (!isObject(value)) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  if (proto == null) {
    return true;
  }
  const protoConstructor =
    Object.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (
    typeof protoConstructor === 'function' &&
    protoConstructor.toString() === Object.toString()
  );
}
