# React restaurant frontend

The React 17 frontend for L’Étoile is an editorial restaurant experience with a warm, expressive visual identity. It shares live restaurant data and reservation capacity with the Angular frontend through the Express API.

## Pages

- `/home` — featured dish, restaurant overview and live highlights.
- `/menu` — API-backed dishes and categories.
- `/menu/:dishId` — dish details, comments and ratings.
- `/aboutus` — restaurant team profiles.
- `/contactus` — guest feedback form.
- `/reservations` — date and party-size availability lookup and reservation requests.

The app uses React Router 5, Redux and Redux Thunk for navigation and API-backed state. Restaurant content is fetched from the backend; avoid treating the sample screenshots or local UI state as the source of truth.

## Run locally

From this directory:

```bash
npm install
npm start
```

The standard development port is 3000. In this multi-app workspace, use port 3001 so it does not conflict with other local services:

```powershell
$env:PORT = '3001'
$env:HOST = '127.0.0.1'
npm start
```

The workspace launcher `../scripts/start-react.ps1` sets these values and opens the app at http://localhost:3001. Start the API and MongoDB first; see the [root setup guide](../README.md).

## API connection

The API base URL is configured in `src/shared/baseUrl.js`. The workspace configuration points to `http://localhost:8002/`; the backend itself defaults to port 8000 when run without the workspace `.env`.

Relevant API resources include `/dishes`, `/leaders`, `/promotions`, `/comments`, `/feedback`, `/restaurant/overview`, and `/reservations`. Reservation submissions are requests that need restaurant confirmation.

## Scripts

- `npm start` — start the development server.
- `npm run build` — create a production build.
- `npm test` — run the Create React App test runner.

## Design direction

React and Angular intentionally do not share a visual design. This frontend uses a typographic, editorial composition with warm accents and photo-led content, while retaining responsive layouts and shared backend data.
