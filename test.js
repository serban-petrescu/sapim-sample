/* global describe, it */
var assert = require("assert");

function run(body) {
    var context = {
        "request.content": JSON.stringify(body)
    };
    delete require.cache[require.resolve("./index.js")];
    global.context = {
        setVariable: function(name, value) {
            context[name] = value;
        },

        getVariable: function(name) {
            return context[name];
        }
    };
    require("./index.js");
    return context;
}

describe("index.js", function () {
    it("should return OK for simple valid input", function () {
        var result = run({name: "Spet", email: "something@yes.com", address: {city: "Cluj", street: "Brassai"}});

        assert.equal(result["response.status.code"], 200);
    });

    it("should return OK for valid input with ugly email", function () {
        var result = run({name: "Spet", email: "customer/department=shipping@example.com",
            address: {city: "Cluj", street: "Brassai"}});

        assert.equal(result["response.status.code"], 200);
    });

    it("should complain when email is invalid", function () {
        var result = run({name: "Spet", email: "am i an email address?",
            address: {city: "Cluj", street: "Brassai"}});

        assert.equal(result["response.status.code"], 400);
    });

    it("should complain when email is missing", function () {
        var result = run({name: "Spet", address: {city: "Cluj", street: "Brassai"}});

        assert.equal(result["response.status.code"], 400);
    });

    it("should complain when name is missing", function () {
        var result = run({email: "something@yes.com", address: {city: "Cluj", street: "Brassai"}});

        assert.equal(result["response.status.code"], 400);
    });

    it("should complain when city is missing", function () {
        var result = run({name: "Spet", email: "something@yes.com", address: {street: "Brassai"}});

        assert.equal(result["response.status.code"], 400);
    });

    it("should complain when whole address is missing", function () {
        var result = run({name: "Spet", email: "something@yes.com"});

        assert.equal(result["response.status.code"], 400);
    });
});
