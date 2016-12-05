**EasyTicket Initiation**
---
_This endpoint should be run by the system administrator when first setting up the EasyTicket install. It generates a master key that can be used to create first-party (auth level 1) keys. Can only be accessed once._

* **URL:**

  `<root>/api/key/init`

* **Method:**

  `GET`

* **URL Params:**

  **Required:**

  * `name`: Name attributed to the master key. Can be your organisation's name or sysadmin's name, for example.

  * `email`: Main contact email. Could be your support email or system admin's email.

  **Optional:**

  None.

* **Data Params:**

    None.

* **Success Response:**

  * **Code:** 200 OK

    **Content:**

    ```
    {
      "key": <string>,
      "limit": <integer>,
      "app_name": <string>,
      "app_description": <string>,
      "author_name": <string>,
      "author_email": <string>,
      "authority_level": <integer>
    }
    ```

* **Error Response:**

  * **Code**: 400 INTERNAL SERVER ERROR

    **Content**: `{ error: "Master key already allocated" }`

    **Reason**: A master key has already been allocated for this easyticket installation.

  * **Code**: 401 BAD request

    **Content**: `{ error: "No name provided" }`

    **Reason**: A name was not provided in the request.

  * **Code**: 401 BAD request

    **Content**: `{ error: "No email provided" }`

    **Reason**: A email was not provided in the request.

* **Sample Call:**

  `curl <root>/api/key/init`

  returns

  ```
    {
      "key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "limit": -1,
      "app_name": "Master",
      "app_description": "Master key for this EasyTicket installation.",
      "author_name": "Alpha Bet",
      "author_email": "alpha@example.com",
      "authority_level": 0
    }
  ```

* **Notes:**
