# Tanaka

Personal website for **Tanaka**, a Latin × House DJ based in British Columbia.

## Stack

- Vite + React + TypeScript
- React Router (HashRouter — works on GitHub Pages with no server-side routing)
- Tailwind CSS v4
- Motion (`motion/react`)
- Firebase (Realtime Database + Google Auth) — for the hidden admin
- Behold.so — Instagram feed widget
- GitHub Pages — hosting

## Routes

| URL | Page |
|---|---|
| `#/` | Home (hero, visuals strip, Instagram feed) |
| `#/about` | About |
| `#/shows` | Upcoming shows (live from Firebase) |
| `#/booking` | Booking — links to Instagram DM |
| `#/admin` | Hidden CRUD panel (auth-gated) |

## Local development

```bash
npm install
cp .env.example .env.local   # fill in real values
npm run dev
```

Open <http://localhost:5173>.

## Firebase setup

1. Create a Firebase project, enable **Realtime Database** and **Email/Password Authentication**.
2. In **Authentication → Users**, click **Add user** to create Tanaka's admin account. Copy the generated UID.
3. Copy the web app config into `.env.local` and set `VITE_ADMIN_UID` to the UID from step 2, then add this RTDB rule:

```json
{
  "rules": {
    "shows": {
      ".read": true,
      ".write": "auth != null && auth.uid == 'TANAKA_UID_HERE'"
    }
  }
}
```

## Deploy

Push to `main`. GitHub Actions runs the workflow in `.github/workflows/deploy.yml`, which builds with `VITE_BASE=/<repo-name>/` and publishes `dist/` to GitHub Pages.

Configure secrets in **Settings → Secrets and variables → Actions**:

- Secrets: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_DATABASE_URL`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`, `VITE_ADMIN_UID`
- Variables: `VITE_INSTAGRAM_HANDLE`, `VITE_BEHOLD_FEED_ID`

## Assets

Visual clips and the logo live in `public/visuals/`. The hero references `hero.mp4`. Drop in lower-bitrate web versions of any new clips you want — keep individual files under ~5MB for a snappy mobile load.

## Out of scope (phase 2)

- Mixes embed (SoundCloud/Spotify)
- Full visuals gallery
- Mailing list
- Merch
