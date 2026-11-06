# Sheeza Ansar — Portfolio (MERN)

Fully dynamic portfolio for **Sheeza Ansar**, BS Software Engineering graduate
(University of Gujrat — Hafiz Hayat Campus, CGPA 3.45/4.00, 118 credit hours).
Pastel pink/violet design, dark/light theme, cute original chibi girl-student
dolls in 2D (SVG) and 3D (Three.js r128, scroll-driven scene), and an admin
dashboard that edits every section without code changes.

> **No projects are seeded.** The CV lists no projects, so the Projects
> collection starts empty and shows "Projects coming soon" until the first
> project is added from the admin dashboard. No contact details are invented:
> social/resume URLs are empty in the seed and the site says
> "References available on request".

## Stack

- Frontend: React 18 + Vite, React Router v6, Axios, plain CSS with CSS variables, three.js 0.128.0, react-helmet-async.
- Backend: Node.js + Express, MongoDB + Mongoose, JWT in an httpOnly SameSite cookie, bcrypt, Zod, helmet, cors whitelist, express-rate-limit, express-mongo-sanitize, hpp, multer + Cloudinary, Nodemailer.
- Architecture: strict MVC — models, controllers (request/response only), services (token, mail, upload), routes (definitions only), middleware, validators, utils, config, seed.

## Quick start

```bash
# 1. Install everything (from the project root)
npm run install:all

# 2. Configure the server
cp server/.env.example server/.env
# Edit server/.env: set MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD.
# Optional: Cloudinary (image uploads) and SMTP (contact emails).
# Without them, uploads/mail fail cleanly with a clear message — never a crash.

# 3. Seed the database (real profile, expertise, skills, highlights, education)
npm run seed

# 4. Run both (server :5000, client :5173)
npm run dev
```

Run separately:

```bash
npm run dev --prefix server   # or: cd server && npm run dev
npm run dev --prefix client   # or: cd client && npm run dev
```

Build the frontend for production: `npm run build` (or `cd client && npm run build`).

## Environment variables

Server (`server/.env`, see `server/.env.example`): `PORT`, `NODE_ENV`,
`MONGODB_URI`, `JWT_SECRET` (required in production, 32+ random characters), `SESSION_HOURS`, `COOKIE_SECURE`, `COOKIE_SAMESITE`, `TRUST_PROXY`,
`CLIENT_ORIGIN` (comma separated list allowed), `ADMIN_EMAIL`, `ADMIN_PASSWORD` (or `ADMIN_PASSWORD_HASH`),
`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`,
`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `MAIL_TO`.

Client (`client/.env.local`, see `client/.env.example`): `VITE_API_URL`
(default `http://localhost:5000/api/v1`).

## API (`/api/v1`)

All responses: `{ success, data, message }`; errors: `{ success: false, message, errors? }`.

### Public

| Method | Route | Notes |
|---|---|---|
| GET | `/health` (also `/api/health`) | Health check, no DB needed |
| GET | `/api/v1/profile` | Single profile document |
| GET | `/api/v1/expertise` | Ordered list |
| GET | `/api/v1/skills` | Ordered list |
| GET | `/api/v1/highlights` | Ordered list |
| GET | `/api/v1/education` | Ordered list |
| GET | `/api/v1/projects` | `?featured=true` filters |
| GET | `/api/v1/projects/:slug` | Single project |
| POST | `/api/v1/messages` | Rate-limited (10 / 15 min), validated, emails owner if SMTP is set |

### Admin (JWT in httpOnly cookie)

| Method | Route |
|---|---|
| POST | `/api/v1/auth/login` (rate-limited) |
| POST | `/api/v1/auth/logout` |
| GET | `/api/v1/auth/me` |
| PUT | `/api/v1/profile` |
| POST / PUT / DELETE | `/api/v1/expertise[/:id]`, `/api/v1/skills[/:id]`, `/api/v1/highlights[/:id]`, `/api/v1/education[/:id]`, `/api/v1/projects[/:id]` |
| POST | `/api/v1/upload` (multipart `image`, max 5 MB, JPEG/PNG/WebP/GIF → Cloudinary URL) |
| GET / PATCH / DELETE | `/api/v1/messages[/:id]` (PATCH body: `{ status: "new" \| "read" \| "replied" }`) |

## Admin dashboard

Visit `/admin` and log in with the seeded admin account. Sections:
Dashboard, Manage Profile, Manage Skills, Manage Expertise, Manage Highlights,
Manage Education, Manage Projects (with image upload), Messages inbox.
Admin routes are protected by `ProtectedRoute`; the API checks the JWT cookie
on every admin route.

## Dolls

- 2D: `client/src/components/dolls/Doll2D.jsx` — port of `dollSVG()` from the
  original single-file portfolio. Hands improved per the plan: round palm,
  thumb and three small fingers; the right arm waves from the elbow.
- 3D: `client/src/components/dolls/Scene3D.jsx` + `doll3d.js` — port of
  `makeDoll()` and the full `buildScene()` scroll-driven Three.js r128 scene
  (torus-knot intro, About solids + swarm, Expertise cubes, Skills gyroscope,
  Highlights planets, Education tunnel, Contact core, floating shapes/hearts/
  stars, particle field, camera stops, HUD, mouse parallax, theme colours).
- 2D/3D toggle is saved in `localStorage` (`sa-mode`); `prefers-reduced-motion`
  defaults to 2D. Theme is saved in `localStorage` (`sa-theme`).

## Deployment

- Database: MongoDB Atlas — set `MONGODB_URI` to the Atlas connection string.
- Backend: Render or Railway — set the env vars above, run `npm install` then
  `npm start` (in `server/`), then `npm run seed` once.
- Frontend: Vercel or Netlify — build command `npm run build`, output `dist`,
  set `VITE_API_URL` to the deployed API base (`https://<api>/api/v1`) and set
  the server's `CLIENT_ORIGIN` to the frontend origin.

## Project tree

```
sheeza-portfolio/
├── package.json  README.md  .gitignore  .eslintrc.cjs  .prettierrc
├── server/  (Express MVC: src/{server,app,config,models,controllers,services,routes,middleware,validators,utils,seed})
└── client/  (React + Vite: src/{main,App,api,hooks,context,pages,components/{layout,sections,dolls,ui,admin},styles,utils})
```


## Security notes

- **Crash fix:** the auth middleware is now wrapped in `asyncHandler`. Before, any request to a protected route without a login cookie (for example `/auth/me`) threw inside an async function on Express 4 and crashed the server.
- Admin password must be 12+ characters; the seed refuses to run in production (it deletes content) unless `--force` is given.
- `JWT_SECRET` must be 32+ random characters in production; cookies are `httpOnly`, `Secure` in production, `SameSite=Lax` (or `None` for a cross-domain deploy).
- Login: generic error, constant-time check, 8 failed attempts per 15 minutes per IP.
- All inputs validated with Zod (length limits, ObjectId params, `http(s)` only URLs, no `javascript:` links).
- Uploads: 5 MB, image types only, file signature is verified, multer 2.x.
- `TRUST_PROXY` is 0 by default so `X-Forwarded-For` cannot be spoofed to bypass rate limits. Set it to 1 behind Render/Railway/Heroku.
- Origin check on all state-changing requests, CORS allow-list, helmet, hpp, mongo-sanitize, 100 KB body limit, global API rate limit.
- After pulling these changes run `npm install --prefix server` (multer was upgraded).
