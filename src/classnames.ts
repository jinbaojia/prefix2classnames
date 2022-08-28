import { addPrefix, isPlainObject, isValidString } from './tools';

type FalseArg = undefined | null | false | 0;
type Args = Array<
  FalseArg | string | { '@prefix'?: string; [propName: string]: any } | Args
>;

export const LocalPrefix = '@prefix';

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
      const prefix = arg[LocalPrefix];
      if (isValidString(prefix)) {
        localPrefix = prefix;
      }
      const list = keys.filter(
        (key) => arg[key as keyof typeof arg] && key !== LocalPrefix
      );
      classList.push(...list);
    } else if (typeof arg === 'string') {
      classList.push(arg);
    }
  });
  return localPrefix;
}

function handleGlobalPrefix(this: any, classList: string[]) {
  const { prefix: globalPrefix } = this || {};
  addPrefix(classList, globalPrefix);
}

function classnames(this: any, ...args: Args): string {
  if (args.length === 0) {
    return '';
  }
  const classList: string[] = [];
  const localPrefix = classnamesImpl(args, classList);
  const filterClassList = [...new Set(classList)];
  addPrefix(filterClassList, localPrefix);
  handleGlobalPrefix.call(this, filterClassList);
  return filterClassList.join(' ');
}

export default classnames;
