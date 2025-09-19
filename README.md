# Async Race

## Description

Async Race is a frontend project built with React, TypeScript, Redux Toolkit, Axios, and TailwindCSS.  
Currently, the layout is ready, Redux is set up, and the Garage page displays cars fetched from the API using Axios.  
Toaster notifications work, and TailwindCSS styling is applied.

## Features

- [x] Project layout (client folder with components, features, api, utils, routes, and styles)
- [x] Redux store setup
- [x] Garage page displays cars fetched via Axios
- [x] TailwindCSS styling applied
- [x] Toaster notifications setup
- [ ] Car creation/update functionality
- [ ] Winners page
- [ ] Race functionality

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- Axios (used for API calls)
- TailwindCSS
- Toaster notifications

## Installation

1. Clone the repository:

```bash
git clone git@github.com:DoctorFreyd/Async-Race.git
cd async-race
```

2. Install dependencies for the client:

cd client
npm install

3. (Optional) If you want to run the server locally, install its dependencies:

cd ../server/async-race-api
npm install

4. Start the frontend:

cd ../../client
npm run dev

5. Open http://localhost:5173 (or the port shown in terminal) to view the app.

## Future Plans

- Implement car creation/update
- Implement winners page and race functionality
- Add more interactive features and UI enhancements
