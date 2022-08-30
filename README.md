# prefix-classNames

A simple utility for conditionally joining classNames together

Install with [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) [pnpm](https://pnpm.io/),:

```bash
pnpm install classnames
```

Use width webpack

```js
import classNames from 'prefix-classnames';
classNames('red', 'blue'); // => 'red blue'
```

## Usage

The `classNames` function takes any number of arguments which can be a string ,array, object.
The argument `'red'` equivalent to `{ red: true }` or `['red']`. If the value associated with a given key is falsy, that key won't be included in the output.Note that the really valid values are strings.

```js
classNames('red', 'blue'); // => 'red blue'
classNames('red', { blue: true }); // => 'red blue'
classNames({ yellow: false }); // => ''
classNames({ red: true }, { blue: true }); // => 'red blue'
classNames({ red: true, blue: true }); // => 'red blue'
// other falsy values and type is not string are just ignored
classNames(null, false, 'red', undefined, 0, 1, { blue: null }, '', /a/g); // => 'red'
```

Arrays will be recursively flattened as per the rules above:

```js
const arr = ['red', null, { blue: true, yellow: false }];
classNames('pink', arr); // => 'pink red blue'
```

### Alternate `bind` version (for [css-modules](https://github.com/css-modules/css-modules))

If you are using [css-modules](https://github.com/css-modules/css-modules), or a similar approach to abstract class "names" and the real `className` values that are actually output to the DOM, you may want to use the `bind` variant.

```js
import classNames from 'prefix-classnames';

var styles = {
  red: '1',
  blue: '2',
  yellow: '3',
};
var cx = classNames.bind(styles);
var className = cx({ red, blue, yellow: true }); // => "1 2 3"
```

### prefix

You can use global prefix and local prefix through some configurations

#### global prefix

```js
import classNames from 'prefix-classnames';

var cx = classNames.bind({
  '-': 'global_',
});

var className = cx({ red, blue, yellow: true }); // => "global_red global_blue global_yellow"

// css module
var styles = {
  global_red: '1',
  global_blue: '2',
  global_yellow: '3',
};

var cx = classNames.bind({
  '-': 'global_',
  styles,
});
var className = cx({ red, blue, yellow: true }); // => "1 2 3"
```

#### local prefix

```js
import classNames from 'prefix-classnames';

var cx = classNames.bind({
  '-': 'global_',
});

var className = cx({ '-': 'local_', red, blue, yellow: true }); // => "global_local_red global_local_blue global_local_yellow"

// css module
var styles = {
  global_local_red: '1',
  global_local_blue: '2',
  global_local_yellow: '3',
};

var cx = classNames.bind({
  '-': 'global_',
  styles,
});
var className = cx({ '-': 'local_', red, blue, yellow: true }); // => "1 2 3"
```

Use `'.'` To match prefix

```js
import classNames from 'prefix-classnames';
var cx = classNames.bind({
  '-': 'global_',
});

var className = cx({ '-': 'local_','.', red, blue, yellow: true }); // => "global_local_ global_local_red global_local_blue global_local_yellow"
```
