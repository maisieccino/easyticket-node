**Get Ticket Info**
----
  _Finds and returns an events ticket availability._

* **URL:**

  `/events/:id/tickets`

  Where `:id` is the ID of the event to fetch information for.

* **Method:**

  `GET`

* **URL Params:**

  None.

* **Data Params:**

  None.

* **Success Response:**

  * **Code:** 200 OK

    **Content:**

    ```
    [
        {
            id: <integer>,
            ...
        },
        ...
    ]
    ```

  * **Code:** 204 NO Content

    **Content:** `{}`

    This is returned if the event has no ticket tiers yet.

* **Error Response:**

  * **Code:** 404 NOT FOUND

    **Content:** `{ error: 'No event with that id' }`

    If the server can't find an event with the given ID, it returns 404.

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
