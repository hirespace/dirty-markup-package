# Dirty Markup
A node wrapper around dirtymarkup.com

##Usage
`dirtymarkup(options, callback)`

Options: An object with at least the `code` property.

Callback: The successful api callback with a `data` parameter.

Returns: An object with `status` and `code` properties.

```
var dirtymarkup = require('dirty-markup')
var options = {
    code: '<div>Some markup</div>'
}
dirtymarkup(options, function(data) {
    console.log(data);
});
```