'use strict';

var Bluebird = require('bluebird');
var request = Bluebird.promisifyAll(require('request'));
var _ = require('lodash');

function Driver(options) {
    if (!options) {
        throw new Error('Missing Options for driver, specify -> {url:url,port:port}');
    }
    this.options = _.assign({
        url: options.url || process.env.HAPIGERJS_URL || "http://localhost",
        port: options.port || process.env.HAPIGERJS_PORT || "3456"
    }, options);
    if (!this.options.url) {
        console.log('Using default URL http://localhost');
        this.options.url = "http://localhost";
    }
    if (!this.options.port) {
        console.log('Using default PORT 3456');
        this.options.port = "3456";
    }
    this.queryUrl = this.options.url + ':' + this.options.port;
}

Driver.prototype.POST = function (target, options, callback) {
	var url = this.queryUrl + target;
	var json = JSON.stringify(options);
	return request.postAsync({url: url, body: json}).then(function (result) {
		var json = JSON.parse(result['body']);
		if (_.isFunction(callback)) {
			callback(null, json);
		} else {
			return json;
		}
	}).catch(function (err) {
		if (_.isFunction(callback)) {
			return callback(err);
		}
		throw err;
	});
};

Driver.prototype.GET = function (target, callback) {
	var url = this.queryUrl + target;
	return request.getAsync({
		url: url
	}).then(function (result) {
		var json;
		if (_.isFunction(callback)) {
			json = JSON.parse(result['body']);
			callback(null, json);
		} else {
			json = JSON.parse(result['body']);
			return json;
		}
	}).catch(function (err) {
		if (_.isFunction(callback)) {
			callback(err);
		} else {
			throw err;
		}
	});
};

Driver.prototype.DELETE = function (target, callback) {
	var url = this.queryUrl + target;
	return request.delAsync({
		url: url
	}).then(function (result) {
		var json;
		if (_.isFunction(callback)) {
			json = JSON.parse(result['body']);
			callback(null, json);
		} else {
			json = JSON.parse(result['body']);
			return json;
		}
	}).catch(function (err) {
		if (_.isFunction(callback)) {
			callback(err);
		} else {
			throw err;
		}
	});
};

module.exports = Driver;
