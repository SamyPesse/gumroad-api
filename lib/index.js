var request = require('request');
var _ = require('lodash');
var util = require('util');
var Q = require('q');
var fs = require('fs');

var Client = function(config) {
    this.config = _.defaults({}, config || {}, {
        'host': "https://api.gumroad.com/v2/",
        'token': null
    });

    this.http = request.defaults({
        'json': true,
        'strictSSL': false,
    });
};

// Normalize an api error
Client.prototype.normError = function(error, response, body) {
    if (body && body.message) error = new Error(body.message);
    error = error || new Error(JSON.stringify(body));
    error.statusCode = response? response.statusCode : 0;
    return error;
};

// Do a rest api request
// mode: get, post, delete, ...
// method: api method name
// args: api args
Client.prototype.request = function(mode, method, args, files) {
    var that = this;
    var deferred = Q.defer();

    files = files || {};

    files = _.chain(files)
    .map(function(filepath, key) {
        return [key, fs.createReadStream(filepath)];
    })
    .object()
    .value();

    args = _.defaults(args || {}, {
        "access_token": this.config.token
    });

    files = _.chain(args)
    .map(function(value, key) {
        if (value === null || value === undefined) return null;
        return [key, _.isObject(value)? JSON.stringify(value) : value.toString()]
    })
    .compact()
    .object()
    .extend(files)
    .value();

    this.http[mode.toLowerCase()](this.config.host+"/"+method, {
        'formData': files
    }, function (error, response, body) {
        if (!error && response && response.statusCode == 200 && body && body.success == true) {
            deferred.resolve(body);
        } else {
            deferred.reject(that.normError(error, response, body));
        }
    });

    return deferred.promise;
};

// List products
Client.prototype.listProducts = function() {
    return this.request("GET", "products").get("products");
};

// Create a product
Client.prototype.createProduct = function(product) {
    return this.request("POST", "products", product).get("product");
};

// Retrieve a product
Client.prototype.getProduct = function(pId) {
    return this.request("GET", "products/"+pId).get("product");
};

// Update a product
Client.prototype.updateProduct = function(pId, infos) {
    return this.request("PUT", "products/"+pId, infos).get("product");
};

// Toggle a product
Client.prototype.toggleProduct = function(pId, state) {
    return this.request("PUT", "products/"+pId+"/"+(state? "enable": "disable")).get("product");
};

// Delete a product
Client.prototype.deleteProduct = function(pId) {
    return this.request("DEL", "products/"+pId);
};

// Verifiy a license code
Client.prototype.verifyLicense = function(pId, license, options) {
    return this.request("POST", "licenses/verify", _.defaults(options || {}, {
        "product_permalink": pId.replace("https://gum.co/", ""),
        "license_key": license
    }));
};

// List offers
Client.prototype.listOffers = function(pId) {
    return this.request("GET", "products/"+pId+"/offer_codes").get("offer_codes");
};

// Create an offer code
Client.prototype.createOffer = function(pId, offer) {
    return this.request("POST", "products/"+pId+"/offer_codes", offer).get("offer_code");
};

// Update an offer code
Client.prototype.updateOffer = function(pId, oId, offer) {
    return this.request("PUT", "products/"+pId+"/offer_codes/"+oId, offer).get("offer_code");
};

// Delete an offer code
Client.prototype.deleteOffer = function(pId, oId) {
    return this.request("DEL", "products/"+pId+"/offer_codes/"+oId);
};

module.exports = Client;
