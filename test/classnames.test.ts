import classnames from '../src/index';
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
    const cx = classnames.bind({ '-': 'bjjin_' });
    let num = cx(null, '', false, 'hover', [
      false,
      '',
      0,
      { blue: false, yellow: true, black: !!'sdf' },
      null,
      undefined,
      'red',
    ]);
    expect(num).toEqual('bjjin_hover bjjin_yellow bjjin_black bjjin_red');
  });
  test('local prefix', () => {
    const cx = classnames.bind({ '-': 'bjjin_' });
    let num = cx(null, '', false, 'hover', [
      false,
      '',
      0,
      { blue: false, yellow: true, black: !!'sdf', '-': 'b_' },
      null,
      undefined,
      'red',
    ]);
    expect(num).toEqual(
      'bjjin_b_hover bjjin_b_yellow bjjin_b_black bjjin_b_red'
    );
  });
  test('css module', () => {
    const cx = classnames.bind({
      '-': 'bjjin_',
      bjjin_b_hover: '1',
      bjjin_b_yellow: '2w',
      bjjin_b_black: '3',
      bjjin_b_red: '4',
    });
    let num = cx(null, '', false, 'hover', [
      false,
      '',
      0,
      { blue: false, yellow: true, black: !!'sdf', '-': 'b_' },
      null,
      undefined,
      'red',
      "blue"
    ]);
    expect(num).toEqual(
      '1 2w 3 4 bjjin_b_blue'
    );
  });
});
