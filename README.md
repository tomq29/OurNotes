# OurNotes

A web app for couples: personal and shared notes with real-time collaborative editing, plus a shared event calendar.

## Features

- **Auth** — JWT with a short-lived access token (5 min) kept in memory and a refresh token (12 h) in an httpOnly cookie. An Axios interceptor catches `403`, refreshes the token and replays the request.
- **Pairs** — find a user by login, send a pair request, accept or decline it. Every user picks a personal color.
- **Personal notes** — rich-text editor (Tiptap): headings, alignment, links, highlight, sub/superscript. Content is stored as JSON in a Postgres `JSONB` column.
- **Shared notes** — real-time collaborative editing built on CRDTs (Yjs + `y-websocket`); the partner's cursor is shown in their color.
- **Shared calendar** — events with types (meeting, outing, errands, birthday, sport), create/edit/delete, Monday-first week.
- **Access control** — every API route is authenticated; notes, events and pair data are scoped to their owner or pair members.
- Protected client routes, light/dark theme, landing page.

## Stack

| | |
|---|---|
| Client | React 18, TypeScript, Vite, Redux Toolkit, React Router 6, Mantine 7, Tiptap, Yjs, react-big-calendar, react-hook-form + yup |
| Server | Node.js, Express 4, Sequelize 6, PostgreSQL, JWT, bcrypt |
| Realtime | `y-websocket` (separate process, port 1234) |
| Deploy | Docker (Node 20 alpine); the server serves the built client as static files |

The client follows Feature-Sliced Design: `App / Pages / Widgets / Entities / Shared`.

## Architecture

```
Browser ──HTTP /api──▶ Express (3000) ──Sequelize──▶ PostgreSQL
   │                        └── serves client build (public/dist)
   └──WebSocket──▶ y-websocket (1234)   ← shared note sync (Yjs)
```

Data model: `User`, `Color`, `Pair` (two users + `pending`/`active` status), `Note` (owned by a user, optionally shared with a pair), `Folder`, `Event`, `EventType`.

## Running locally

Requires Node.js 20+ and PostgreSQL.

### 1. Server

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=3000
ACCESS_TOKEN_SECRET=any_random_string
REFRESH_TOKEN_SECRET=another_random_string
```

Create `server/db/config/database.json` (git-ignored):

```json
{
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "ournotes",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

Create the database, run migrations and seeds, start the API and the collaboration server:

```bash
npx sequelize db:create
npm run db:migSeed           # recreates the schema and loads demo data
npm run dev                  # API on http://localhost:3000
npm run y-webSocket-server   # in a second terminal, needed for shared notes
```

### 2. Client

```bash
cd client
npm install
npm run dev                  # Vite proxies /api to localhost:3000
```

Shared notes connect to `VITE_WS_URL` (see `client/.env.example`), defaulting to port `1234` on the current host.

### Demo users

After `db:migSeed` the users from `server/db/seeders/2-User.js` are available, e.g. `tom@kiss` / `123` and `marie@curie` / `123` — they are already a pair.

## Build and deploy

```bash
cd client && npm run build
# copy client/dist into server/public/dist
cd ../server && docker compose up --build
```

The container runs `app.sh`: `y-websocket` on 1234 and the Express server. `.env` and `db/config/database.json` are copied into the image, so for compose set `PORT=80` in `.env` and add a `production` section to `database.json`. `compose.yaml` only starts the app — PostgreSQL is external.

## Project structure

```
client/
  services/axiosInstace.ts    axios instance with token refresh
  src/App/                    router, store
  src/Pages/                  pages (notes, editors, calendar, profile, auth)
  src/Widgets/                navbar, footer
  src/Entities/               Notes, User, Pairs, Events, … — api / model / type / ui
  src/Shared/                 ProtectedRouter, spinner, theme toggle
server/
  app.js                      Express, static files, /api
  routes/api/                 auth, tokens, notes, pairs, events, users, …
  middleware/                 access/refresh token verification
  utils/access.js             ownership and pair membership checks
  db/                         Sequelize models, migrations, seeds
```
