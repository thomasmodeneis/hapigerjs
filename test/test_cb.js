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

    it('Driver should show namespaces with cb()', function (done) {
        client.GET("/namespaces", function (err, res) {
            if (err) {
                done(err);
            } else {
                expect(res).to.have.property('namespaces');
                done();
            }
        });
    });

    it('Driver should create namespace with cb()', function (done) {
        client.POST("/namespaces", {namespace: "test"}, function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.property('namespace');
                    done();
                }
            });
    });

    it('Driver should create an event with cb()', function (done) {
        client.POST("/events", {
            events: [{
                "namespace": "test",
                "person": "Thomas",
                "action": "view",
                "thing": "ID-comentario-cretino"
            }]
        }, function (err, res) {
            if (err) {
                done(err);
            } else {
                expect(res).to.have.property('events');
                done();
            }
        })
    });

    it('Driver should create another event with cb()', function (done) {
        client.POST("/events", {
            events: [{
                "namespace": "test",
                "person": "Fabio",
                "action": "view",
                "thing": "ID-comentario-cretino"
            }]
        }, function (err, res) {
            if (err) {
                done(err);
            } else {
                expect(res).to.have.property('events');
                done();
            }
        })
    });

    it('Driver should create another event with cb()', function (done) {
        client.POST("/events", {
            events: [{
                "namespace": "test",
                "person": "Fabio",
                "action": "buy",
                "thing": "HairGel",
                "expires_at": "2017-10-12"
            }]
        }, function (err, res) {
            if (err) {
                done(err);
            } else {
                expect(res).to.have.property('events');
                done();
            }
        })
    });

    it('Driver should recommend item to person with cb()', function (done) {
        client.POST("/recommendations", {
            "namespace": "test",
            "person": "Thomas",
            "configuration": {
                "actions": {"view": 5, "buy": 10}
            }
        }, function (err, res) {
            if (err) {
                done(err);
            } else {
                expect(res).to.have.property('recommendations');
                done();
            }
        });

    });

    it('Driver should compact a namespace with cb()', function (done) {
        client.POST("/compact", {
            "namespace": "test"
        }, function (err, res) {
            if (err) {
                done(err);
            } else {
                expect(res).to.have.property('init_count');
                done();
            }
        });
    });

    it('Driver should delete a namespace with cb()', function (done) {
        client.DELETE("/namespaces/test", function (err, res) {
            if (err) {
                done(err);
            } else {
                expect(res).to.have.property('namespace');
                done();
            }
        });
    });

});
