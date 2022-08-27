import { isPlainObject } from './tools';

function classnames(...args: unknown[]) {
  if (args.length === 0) {
    return '';
  }
  const classList: string[] = [];
  args.forEach((arg) => {
    if (!arg) {
      return;
    }
    if (Array.isArray(arg)) {
      classList.push(classnames(...arg));
    } else if (isPlainObject(arg)) {
      const keys = Object.keys(arg);
      if (keys.length === 0) {
        return;
      }
      const list = keys.filter((key) => arg[key as keyof typeof arg]);
      classList.push(...list);
    } else {
      classList.push((arg as any).toString());
    }
  });

  return classList.join(' ');
}
export default classnames;
