'use strict';

var chai = require('chai').use(require('chai-as-promised'));
var expect = chai.expect;

var hapigerjs = require('../');
var url = process.env.HAPIGERJS_URL;
var port = process.env.HAPIGERJS_PORT;

describe('Testing HapiGER events', function () {
	var client;
	this.timeout(15000);

	before(function () {
		client = new hapigerjs.Driver({
			url: url,
			port: port
		});
	});

	it('Driver should be a function', function () {
		expect(hapigerjs.Driver).to.be.a('function');
	});

	it('Driver should fail if not supplied with options {} URL / PORT', function () {
		function instantiateEvents() {
			new hapigerjs.Driver();
		}

		expect(instantiateEvents).to.throw(Error);
	});

    it('Driver should show namespaces', function () {
        return expect(client.GET("/namespaces")).to.eventually.have.property('namespaces');
    });

    it('Driver should create namespace', function () {
        return expect(client.POST("/namespaces",{namespace: "test"})).to.eventually.have.property('namespace');
    });

	it('Driver should create an event', function () {
		return expect(client.POST("/events", {
			events:[{
				"namespace": "test",
				"person": "Thomas",
				"action": "view",
				"thing": "ID-comentario-cretino"
			}]}
		)).to.eventually.have.property('events');
	});

	it('Driver should create another event', function () {
		return expect(client.POST("/events", {
			events:[{
				"namespace": "test",
				"person": "Fabio",
				"action": "view",
				"thing": "ID-comentario-cretino"
			}]}
		)).to.eventually.have.property('events');
	});

	it('Driver should create another event', function () {
		return expect(client.POST("/events", {
			events:[{
				"namespace": "test",
				"person": "Fabio",
				"action": "buy",
				"thing": "HairGel",
				"expires_at": "2016-10-12"
			}]}
		)).to.eventually.have.property('events');
	});

	it('Driver should recommend item to person ', function () {
		return expect(client.POST("/recommendations", {
				"namespace": "test",
				"person": "Thomas",
				"configuration": {
					"actions" : {"view": 5, "buy": 10}
				}
			}
		)).to.eventually.have.property('recommendations');
	});

    it('Driver should compact a namespace', function () {
        return expect(client.POST("/compact", {
                "namespace": "test"
            }
        )).to.eventually.have.property('init_count');
    });

    it('Driver should delete a namespace', function () {
        return expect(client.DELETE("/namespace/test")).to.eventually.have.property('namespace');
    });



});
