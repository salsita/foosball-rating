# foosball-rating

Foosball Rating App

Notes on running the app locally
--------------------------------
**NOTE**: to run database locally with test data, see `backend/README.md`

1) Run npm install in both backend and frontend folders.

2) Copy `frontend/.env.local.example` to `frontend/.env` 
(does not apply in case of running in docker)

3) Run npm start in backend and THEN in frontend.

Run e2e tests
-------------

1) start BE and FE, for example via `npm start:e2e` with prior database setup. You may need to pass `DATABASE_URL` parameter, see `backend/README.md`.
2) open cypress in watch mode `npm run cypress`
3) select browser and run all tests
