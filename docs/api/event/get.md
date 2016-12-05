**Get Event**
----
  _Finds and returns an event by its id._

* **URL:**

  `/event/:id`

  Where `:id` is the ID of the event to be fetched.

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
      {
          id: <integer>,
          ...
      }
      ```

* **Error Response:**

  * **Code:** 404 NOT FOUND

    **Content:** `{ error: 'No event with that id' }`

* **Sample Call:**

  `curl <root>/events/1`

  returns

  ```
  {
      id: 1,
      name: "Tech Talk",
      {...}
  }
  ```

* **Notes:**

  This endpoint is considered a "public" endpoint; that is, it does not contain any private information. Thus, it will not need an OAuth key to be passed as a parameter. The return data in full will look like this:

  ```
  {
      id: <integer>,
      name: <string>,
      description: <string>,
      datetime_start: <datetime>,
      datetime_end: <datetime>,
      img_logo_url: <url>,
      img_banner_url: <url>,
      venue: {
          id: <integer>,
          name: <string>
      },
      organisation: {
          id: <integer>,
          name: <string>
      },
      ticket_tiers: [
        {
            id: <integer>,
            name: <string>,
            cost: <float>,
            description: <string>,
            quantity: <integer>,
            available: <integer>
        }
      ]
  }
  ```

  It's worth noting that the get event endpoint will return a very rich set of data. If you only need one set of data from the event, e.g. ticket availability, then you're best off using the specific endpoint for that instead.
