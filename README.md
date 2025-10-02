# Async Race

## Score: 275/400

---

## Checklist

### Basic Structure (80 points)

- [x] Two Views: "Garage" and "Winners" - 10/10
- [x] Garage View Content (Name, Car creation/editing panel, Race control panel, Garage section) - 20/30
- [ ] Winners View Content (Name, Winners table, Pagination) - 0/10
- [x] Persistent State (page numbers, input states) - 10/30

### Garage View (90 points)

- [x] Car Creation/Editing Panel (CRUD) - 20/20
- [x] Color Selection - 10/10
- [x] Random Car Creation (100 cars per click) - 20/20
- [x] Car Management Buttons (update/delete) - 10/10
- [ ] Pagination (7 cars per page) - 0/10
- [ ] Extra Points: Empty garage handling, previous page on deletion - 0/20

### Winners View (50 points)

- [ ] Display Winners - 0/15
- [ ] Pagination (10 winners per page) - 0/10
- [ ] Winners Table (№, image, name, wins, best time) - 0/15
- [ ] Sorting (by wins and best time) - 0/10

### Race (170 points)

- [x] Start Engine Animation - 20/20
- [x] Stop Engine Animation - 20/20
- [x] Responsive Animation - 30/30
- [x] Start Race Button - 10/10
- [ ] Reset Race Button - 0/15
- [ ] Winner Announcement - 0/5
- [x] Button States (disable/enable) - 20/20
- [x] Actions during the race (delete/edit/add car, change page/view) - 50/50

### Prettier and ESLint Configuration (10 points)

- [x] Prettier setup - 5/5
- [ ] ESLint setup - 0/5

### Overall Code Quality (100 points)

- [ ] Modular design, function modularization, readability, no magic numbers, extra features - discretionary

---

## Description

Async Race is a frontend project built with React, TypeScript, Redux Toolkit, Axios, and TailwindCSS.  
Currently, the layout is ready, Redux is set up, and the Garage page displays cars fetched from the API using Axios.  
Toaster notifications work, and TailwindCSS styling is applied.

---

## Features

- [x] Project layout (client folder with components, features, api, utils, routes, and styles)
- [x] Redux store setup
- [x] Garage page displays cars fetched via Axios
- [x] TailwindCSS styling applied
- [x] Toaster notifications setup
- [x] Car creation/update functionality
- [ ] Winners page
- [ ] Race functionality

---

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- Axios (used for API calls)
- TailwindCSS
- Toaster notifications

---

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

- Implement winners page and race functionality
- Add more interactive features and UI enhancements
