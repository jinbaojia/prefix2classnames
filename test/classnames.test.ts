import { classnames } from '../src/index';
describe('classnames', () => {
  test('false, null, undefined', () => {
    let num = classnames(false, null, undefined);
    expect(num).toEqual('');
  });
  test('1, 2, 0', () => {
    let num = classnames(1, 2, 0);
    expect(num).toEqual('1 2');
  });
  test('arr & normal type', () => {
    let num = classnames(null, '', 1, 2, 3, false, [
      1,
      2,
      false,
      4,
      '',
      0,
      null,
      undefined,
    ]);
    expect(num).toEqual('1 2 3 1 2 4');
  });
});
