import { addPrefix, isPlainObject, isValidString } from './tools';

type FalseArg = undefined | null | false | 0;
type Args = Array<
  FalseArg | string | { '-'?: string; [propName: string]: any } | Args
>;

export const Prefix = '-';

function classnamesImpl(args: Args, classList: string[]): string {
  let localPrefix = '';
  args.forEach((arg) => {
    if (!arg) {
      return;
    }
    if (Array.isArray(arg)) {
      const _localPrefix = classnamesImpl(arg, classList);
      !localPrefix && (localPrefix = _localPrefix);
    } else if (isPlainObject(arg)) {
      const keys = Object.keys(arg);
      if (keys.length === 0) {
        return;
      }
      const prefix = arg[Prefix];
      if (isValidString(prefix)) {
        localPrefix = prefix;
      }
      const list = keys.filter(
        (key) => arg[key as keyof typeof arg] && key !== Prefix
      );
      classList.push(...list);
    } else if (typeof arg === 'string') {
      classList.push(arg);
    }
  });
  return localPrefix;
}

export function classnames(this: any, ...args: Args): string {
  if (args.length === 0) {
    return '';
  }
  let classList: string[] = [];
  const localPrefix = classnamesImpl(args, classList);
  classList = [...new Set(classList)];
  addPrefix(classList, localPrefix);
  if (this) {
    const { [Prefix]: globalPrefix } = this;
    addPrefix(classList, globalPrefix);
    const stylesLen = Object.keys(this).length;
    if (stylesLen > 0 && !(stylesLen === 1 && this[Prefix])) {
      classList = classList.map((key) => this[key] || key);
    }
  }
  return classList.join(' ');
}
