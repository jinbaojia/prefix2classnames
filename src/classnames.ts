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

function handleGlobalPrefix(this: any, classList: string[]) {
  const { prefix: globalPrefix } = this || {};
  const isValidPrefix = typeof globalPrefix === 'string' && globalPrefix;
  if (isValidPrefix) {
    const len = classList.length;
    for (let i = 0; i < len; i++) {
      classList[i] = globalPrefix + classList[i];
    }
  }
}

export function classnames(this: any, ...args: Args): string {
  if (args.length === 0) {
    return '';
  }
  const classList: string[] = [];
  classnamesImpl(args, classList);
  const filterClassList = [...new Set(classList)];
  handleGlobalPrefix.call(this, filterClassList);
  return filterClassList.join(' ');
}
