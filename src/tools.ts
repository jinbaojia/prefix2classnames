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

export function isValidString(value: unknown): value is string {
  return typeof value === 'string' && !!value;
}

export function addPrefix(classList: string[], prefix: string) {
  const isValidPrefix = isValidString(prefix);
  if (isValidPrefix) {
    const len = classList.length;
    for (let i = 0; i < len; i++) {
      const className = classList[i];
      if (className === '.') {
        classList[i] = prefix;
      } else {
        classList[i] = prefix + className;
      }
    }
  }
}
