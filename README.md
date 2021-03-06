# Dirty Markup
A node wrapper around dirtymarkup.com

## Usage
`dirtymarkup(options, callback)`

Options: An object with at least the `code` property.

Callback: The successful api callback with a `data` parameter.

Returns: An object with `status` and `code` properties.

```js
var dirtymarkup = require('dirty-markup')
var options = {
    code: '<div>Some markup</div>'
}
dirtymarkup(options, function(data) {
    console.log(data);
});
```

## Options
`code`: Required, this is a string of the code getting cleaned.

`indent`: Optional, defaults to auto. Options are `auto`, `block` or `none`.

`indent-size`: Optional, defaults to 4. Options are `'tabs'`, `2`, `4` or `8`.

`allow-proprietary-attributes`: Optional, no default. Set to `1` to allow.

`mode`: Optional, defaults to `html`. Options include `html` or 'css'.