# foosball-rating

Foosball Rating App

Notes on running the app locally
--------------------------------

1) Run npm install in both backend and frontend folders.

2) Add the following change to frontend/src/app/modules/api/client-config.js:

    ```
    --- a/frontend/src/app/modules/api/client-config.js
    +++ b/frontend/src/app/modules/api/client-config.js
    @@ -1,4 +1,4 @@
     export const config = {
    -    baseURL: `${window.location.protocol}//${window.location.hostname}/api`,
    +    baseURL: `${window.location.protocol}//${window.location.hostname}:3000`,
         timeout: 5000
     }
    ```

3) Run npm start in backend and THEN in frontend.
