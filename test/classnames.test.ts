import { classnames } from '../src/index';
describe('classnames', () => {
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

  test('global prefix', () => {
    const cx = classnames.bind({ prefix: "bjjin_" });
    let num = cx(null, '', false, 'hover', [
      false,
      '',
      0,
      { blue: false, yellow: true, black: !!'sdf' },
      null,
      undefined,
      'red',
    ]);
    console.log(num)
    expect(num).toEqual('bjjin_hover bjjin_yellow bjjin_black bjjin_red');
  });
});
