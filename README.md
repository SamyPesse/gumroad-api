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

## Products

Reference: https://gumroad.com/api#products

#### List products

```js
gumroad.listProducts()
.then(function(products) {
    ...
});
```

#### Create a product

```js
gumroad.createProduct({
	"name": "..."
})
.then(function(product) {
    ...
});
```

#### Retrieve a product

```js
gumroad.getProduct("my-product-id")
.then(function(product) {
    ...
});
```

#### Update a product

```js
gumroad.updateProduct("my-product-id", {
	// infos
})
.then(function(product) {
    // Product has been updated
});
```

#### Enable/disable a product

```js
gumroad.toggleProduct("my-product-id", false)
.then(function(product) {
    // Product has been disabled/enabled
});
```

#### Delete a product

```js
gumroad.deleteProduct("my-product-id")
.then(function() {
    // Product has been deleted
});
```

## Offer Codes

Reference: https://gumroad.com/api#offer-codes

#### List offers for a product

```js
gumroad.listOffers("product-id")
.then(function(offers) {
    ...
});
```

#### Create an offer

```js
gumroad.createOffer("product-id", {
    "name": "..."
})
.then(function(offer) {
    ...
});
```

#### Retrieve an offer

```js
gumroad.getOffer("product-id", "offer-id")
.then(function(offer) {
    ...
});
```

#### Delete an offer

```js
gumroad.deleteOffer("product-id", "offer-id")
.then(function() {
    // Offer has been deleted
});
```

#### Update a product

```js
gumroad.updateOffer("product-id", "offer-id", {
    // infos
})
.then(function(offer) {
    // Offer has been updated
});
```

## Licenses

Reference: https://help.gumroad.com/customer/portal/articles/1579327-license-keys

#### Verify a license key

```js
gumroad.verifyLicense("my-product-id", "license-key")
.then(function(license) {
    // License is OK
}, function() {
    // License verification failed
});
```



