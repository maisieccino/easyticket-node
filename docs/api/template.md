## APIDoc Template
_All methods below are methods that relate to one or more users._

**name**
----
  _Finds and returns a user by their id._

* **URL:**

  `<path_from_root>`

* **Method:**

  `(GET|POST|PUT|DELETE)`

* **URL Params:**

  **Required:**

  **Optional:**

* **Data Params:**

* **Success Response:**

  * **Code:** 200 OK

    **Content:** `{ object }`

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
