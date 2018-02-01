/* global context */
const schema = require("validate");

const validate = data => schema({
    name: {
        type: "string",
        required: true,
        message: "Name is required."
    },
    email: {
        type: "string",
        required: true,
        match: /\S+@\S+\.\S+/,
        message: "Email must be valid."
    },
    address: {
        street: {
            type: "string",
            required: true,
            message: "Street is required."
        },
        city: {
            type: "string",
            required: true,
            message: "City is required."
        }
    }
}).validate(data);

const errors = validate(JSON.parse(context.getVariable("request.content")));

context.setVariable("response.headers.content-type", "application/json");
if (errors.length) {
    context.setVariable("response.status.code", 400);
    context.setVariable("response.reason.phrase", "Bad Request");
    context.setVariable("response.content", JSON.stringify(errors));
} else {
    context.setVariable("response.status.code", 200);
    context.setVariable("response.reason.phrase", "OK");
    context.setVariable("response.content", JSON.stringify({"result": "ok"}));
}
