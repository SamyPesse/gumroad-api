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
        'headers': {
            'User-Agent': 'gumroad-api-node',
            'Content-Type': "application/json"
        },
        'strictSSL': false,
    });
};

// Normalize an api error
Client.prototype.normError = function(error, body) {
    if (body && body.message) error = new Error(body.message);
    error = error || new Error(JSON.stringify(body));
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
        return [key, _.isObject(value)? JSON.stringify(value) : value.toString()]
    })
    .object()
    .extend(files)
    .value();
    console.log(files);
    this.http[mode.toLowerCase()](this.config.host+"/"+method, {
        'formData': files
    }, function (error, response, body) {
        if (!error && response.statusCode == 200 && body && body.success == true) {
            deferred.resolve(body);
        } else {
            deferred.reject(that.normError(error, body));
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

module.exports = Client;
