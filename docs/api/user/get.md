**Get User**
----
  _Finds and returns a user by their ID._

* **URL:**

  `/user/:id`

  Where `:id` is the integer ID of the user to be found.

* **Method:**

  `GET`

* **URL Params:**

  **Optional**:

    `token`: An OAuth token which is required for viewing sensitive user data.

* **Data Params:**

  None.

* **Success Response:**

  * **Code:** 200 OK

    **Content:** `{ id: <id>, ... }`

* **Error Response:**

  * **Code:** 404 NOT FOUND

    **Content:** `{ error: 'No user with that id' }`

* **Sample Call:**

  `curl <root>/users/1`

  returns

  ```
  {
      id: 1,
      name: "John Smith",
      {...}
  }
  ```

* **Notes:**

  Without OAuth authorisation, this endpoint will only return public information about a user. When an OAuth token is provided, the response will also include email address and phone number. User password digests will **never** be transmitted by the API. Here is the full object that gets returned:
  ```
  {
      id: <integer>,
      name: <string>,
      name_short: <string>,
      img_profile_url: <url>,
      has_profile: <boolean>,
	  email: <optional_string>,
	  phone: <optional_string>
  }
  ```
