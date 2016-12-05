# EasyTicket API authentication
For your app to use EasyTicket's API, you must first register an API key. This can be done on the web interface or, providing that you have an existing API key with sufficient privileges, you can use the `/api/key/create` endpoint to create a key.

## authority_level
The `authority_level` of an API key defines the privileges that can be accessed using the API key. Here's a guide to what each key can do:

* 0: Master key. Used to create API keys for the web interface and first party apps. Created using the `/api/key/init` endpoint. Keep this key safe.

* 1: First party app key. Used for the web interface and first party apps. Can access all endpoints, and can create/modify/disable any API key apart from the master key.

* 2: Third paty app key. Created using a first party app key. Certain functions are limited, including API key management.

[**Generate key**](./auth/genkey.md)
---
Function that returns a random API key. Used to test the `generateKey()` method of the `ApiKey` object. To be deprecated soon.

[**EasyTicket initiation**](./auth/init.md)
---
Endpoint that should be run to generate the API master key. Can only be used once.



[**Create key**](./auth/create.md)
---
Creates a new API key with the given attributes.
