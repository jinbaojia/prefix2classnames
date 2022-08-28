import { classnames } from '../src/index';
describe('classnames', () => {
  test('false, null, undefined', () => {
    let num = classnames(false, null, undefined);
    expect(num).toEqual('');
  });
  test('arr & normal type', () => {
    let num = classnames(null, '', false, 'hover', [
      false,
      '',
      0,
      { blue: false, yellow: true, black: !!'sdf' },
      null,
      undefined,
      'red',
    ]);
    expect(num).toEqual('hover yellow black red');
  });
});
