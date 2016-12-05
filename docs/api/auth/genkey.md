**Generate Key**
----
  _(deprecated) generates a random API key string._

* **URL:**

  `/api/key/genkey`

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
"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    ```

* **Error Response:**

    None.

* **Sample Call:**

  `curl <root>/api/key/genkey`

  returns

  ```
"6179ebab017fecf1513823b42fb64f3b969c0b0e"
  ```

* **Notes:**
