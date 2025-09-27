# AcademyManagerApp

AcademyManagerApp is a React Native mobile client built with [Expo](https://expo.dev/). It provides role-based tools for academy stakeholders, letting each user type access the workflows registered in the navigation stacks exposed from `App.js`. From launch, the app loads fonts, resolves authentication state, and then routes admins, coaches, parents, and players to their dedicated stack (`AdminStack`, `CoachStack`, `ParentStack`, or `PlayerStack`). Users without a role fall back to the authentication stack so they can sign in before accessing the protected experience.

## Admin navigation highlights
`navigation/AdminStack.js` collects the back-office modules that administrators rely on daily. Beyond the main tab navigator, it registers dedicated screens for player rosters, individual player details, coach management, team organization, financial tracking, attendance dashboards, training sessions, attendance leaderboards, and more. These screens are presented with custom headers and reuse the shared tab navigation for quick switching between dashboards.

## Prerequisites & tooling
To run the mobile client locally you will need:

- **Node.js** and **npm** (install from [nodejs.org](https://nodejs.org/)).
- **Expo CLI** (`npm install -g expo-cli`) so you can run the app on an emulator or a physical device using Expo Go.

Once the tooling is installed:

1. Install dependencies with `npm install`.
2. Start the Expo development server with either `npx expo start` or the bundled script `npm run start` defined in `package.json`.
3. Choose the desired platform target from the Expo CLI (web, Android, iOS) or use the shortcut scripts (`npm run android`, `npm run ios`, `npm run web`).

## Authentication & backend connectivity
The login experience (`screens/Auth/LoginScreen.js`) captures credentials and invokes the `login` method from the shared user context. Under the hood, this context persists the received token, fetches the authenticated user profile and academy data, and then unlocks the role-specific navigation stacks. Network requests resolve against the base URL exported from `constants/backendURL.js`. By default it points to `http://localhost:3000/api`, and an alternative LAN URL is commented in the file. Update this constant (or inject it via environment configuration) to match your running backend before testing on a device.

## Feature overview
- **Player management** – The staff player directory (`screens/Staff/PlayersScreen.js`) combines search, team filtering, and pull-to-refresh with secure API calls. Staff can open the add-player flow to capture roster details, set positions, assign teams, upload profile photos, and submit the record via `components/Forms/AddPlayerForm.js`.
- **Staff dashboards** – Administrators land on the tab navigator where `StaffDashboard`, `ScheduleScreen`, `ClubScreen`, and `StaffSettings` provide overviews across operations, events, club data, and configuration (`navigation/TabNavigator.js`).
- **Team operations** – Admin-specific routes cover team rosters, attendance capture, training sessions, financial logs, and statistical dashboards (`navigation/AdminStack.js`).

## Project structure & next steps
- **Navigation** – Explore `navigation/` to review how each role stack is composed (`AdminStack`, `CoachStack`, etc.) and how the tab navigator ties together the staff experience.
- **Context providers** – Shared state such as authentication and academy metadata lives in `context/userContext.js`, which wraps the app in `App.js`. Extend or introduce new contexts here as the project grows.

With these touchpoints you can orient yourself quickly, point the client at a live backend, and continue building new capabilities for the academy community.
