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

Reference: https://gumroad.com/api#products

```js
gumroad.listProducts()
.then(function(products) {
    ...
});
```

### Create a product

Reference: https://gumroad.com/api#products

```js
gumroad.createProduct({
	"name": "..."
})
.then(function(product) {
    ...
});
```

### Retrieve a product

Reference: https://gumroad.com/api#products

```js
gumroad.getProduct("my-product-id")
.then(function(product) {
    ...
});
```

### Update a product

Reference: https://gumroad.com/api#products

```js
gumroad.updateProduct("my-product-id", {
	// infos
})
.then(function(product) {
    ...
});
```

### Enable/disable a product

Reference: https://gumroad.com/api#products

```js
gumroad.toggleProduct("my-product-id", false)
.then(function(product) {
    // product is disabled
});
```

### Delete a product

Reference: https://gumroad.com/api#products

```js
gumroad.deleteProduct("my-product-id")
.then(function() {
    ...
});
```

### Verify a license key

```js
gumroad.verifyLicense("my-product-id", "license-key")
.then(function() {
    ...
});
```

