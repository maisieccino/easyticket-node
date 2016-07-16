## /user - User API
_All methods below are methods that relate to one or more users._

**Get User**
----
  _Finds and returns a user by their ID._

* **URL:**

  `/user/:id`

  Where `:id` is the integer ID of the user to be found.

* **Method:**

  `GET`

* **URL Params:**

  None.

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

  This endpoint will only return public information about a user. Here is the full object that gets returned:
  ```
  {
      id: <integer>,
      name: <string>,
      name_short: <string>,
      img_profile_url: <url>,
      has_profile: <boolean>
  }
  ```

 Only requests that are authenticated as that specific user are able to access more information.
