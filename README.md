Gumroad API Client
================

This is a client library to access the Gumroad API. This client uses promises.

```js
var Gumroad = require("gumroad-api");
var gumroad = new Publisher({
	auth: {

	}
});
```

### List products

```js
publisher.listProducts()
.then(function(products) {
    ...
});
```
