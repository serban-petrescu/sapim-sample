# sapim sample
> Sample project using the sapim library

This is a simple JSON form validator API proxy definition built with the [SAP API Manager Tools](https://github.com/serban-petrescu/sapim).

## Prerequisites
You should have `node-js` and `npm` installed.

## Instructions
To deploy the proxy on your own API Manager account:
 - `git clone` the repository
 - `npm install`
 - [setup the sapim configuration](https://github.com/serban-petrescu/sapim/wiki/Configuration)
 - `npm run deploy`

## Test cases
With valid input:

```
curl -X POST \
  https://your-api-management.host.com/sample \
  -H 'Content-Type: application/json' \
  -d '{
	"name": "Spet",
	"email": "something@example.com",
	"address": {
		"city": "Cluj",
		"street": "Brassai"
	}
}'
```

```json
{
    "result": "ok"
}
```

With invalid input:

```
curl -X POST \
  https://your-api-management.host.com/sample \
  -H 'Content-Type: application/json' \
  -d '{
	"name": "Spet",
	"email": "not-an-email",
	"address": {
		"city": "Cluj"
	}
}'
```

```json
[
    {
        "message": "Email must be valid.",
        "path": "email"
    },
    {
        "message": "Street is required.",
        "path": "address.street"
    }
]
```
