import { addPrefix, isPlainObject, isValidString } from './tools.js';

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

export default function classNames(this: any, ...args: Args): string {
  if (args.length === 0) {
    return '';
  }
  let classList: string[] = [];
  let prefix = classnamesImpl(args, classList);
  const { [Prefix]: globalPrefix = '', styles } = this || {};
  prefix = globalPrefix + prefix;
  const hasStyles = isPlainObject(styles as object);
  addPrefix(classList, prefix);
  if (hasStyles) {
    //css module
    classList = classList.map((key) => styles[key] || key);
  }
  return classList.join(' ');
}
