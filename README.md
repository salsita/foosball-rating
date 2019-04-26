## foosball-rating

Foosball Rating App

## General

This is the root of the project. The application itself is divided into several sub-projects:

 - [`frontend`](./frontend/README.md): The frontend application created in React
 - [`backend`](./backend/README.md): The backend application in Node.js using Express

 
## Available scripts

 - `start`: Starts the frontend and api-server in development mode


 ## Running the application

 - For running the backend locally, please see the [`backend readme`](./backend/README.md)
 - In order for the frontend to run against the local backend, please change the following line of the file `frontend/src/app/modules/api/client-config.js`:
   ```
   baseURL: `${window.location.protocol}//${window.location.hostname}/api`
   ```
   to
   ```
   baseURL: `${window.location.protocol}//${window.location.hostname}:3000`
   ```
   (replace `3000` by the port where your backend is running on `localhost`)

 ## frontend general information 

 - ['styled-components'](https://www.styled-components.com/): used for styling app and creating reusable components 
 
 # structure 

 - app
    <br/>|-- components : reusable components like: inputs, navs, buttons, accordion etc.
    <br/>|-- const : definition of application routes
    <br/>|-- modules : services for connecting to the API / actions / reducers / selectors
    <br/>|-- pages : AddUser, CreateMatch, Dashboard etc.. 
    
 - media : folder for images/assets 
 - styles : reusable styled components / styles
