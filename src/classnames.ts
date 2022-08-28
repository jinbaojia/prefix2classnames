import { isPlainObject } from './tools';

type FalseArg = undefined | null | false | 0;
type Args = Array<FalseArg | string | { [index: string]: boolean } | Args>;
function classnamesImpl(args: Args, classList: string[]) {
  args.forEach((arg) => {
    if (!arg) {
      return;
    }
    if (Array.isArray(arg)) {
      classnamesImpl(arg, classList);
    } else if (isPlainObject(arg)) {
      const keys = Object.keys(arg);
      if (keys.length === 0) {
        return;
      }
      const list = keys.filter((key) => arg[key as keyof typeof arg]);
      classList.push(...list);
    } else if (typeof arg === 'string') {
      classList.push(arg);
    }
  });
}

export function classnames(...args: Args): string {
  if (args.length === 0) {
    return '';
  }
  const classList: string[] = [];
  classnamesImpl(args, classList);
  return [...new Set(classList)].join(' ');
}
