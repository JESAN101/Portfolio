# Portfolio CMS

A premium full-stack portfolio website with a secure Content Management System (CMS). Manage projects, skills, experience, education, certificates, and contact messages — all from a polished admin dashboard — without touching code.

- **Live Site:** [https://portfolio-jesan102.vercel.app](https://portfolio-jesan102.vercel.app)
- **Admin Panel:** `https://portfolio-jesan102.vercel.app/admin/login`

---

## Features

### Public Website

- **Home** — animated hero with typewriter effect, about preview, featured projects, skills marquee, experience timeline, certificates, and contact CTA
- **Projects** — project cards with live demo / source links, search, filtering, and rich project detail pages (gallery with lightbox, tech stack, related projects)
- **About** — bio, stats, downloadable resume
- **Skills** — categorized skills with proficiency and custom icons
- **Experience** — professional timeline with roles, companies, and technologies
- **Certificates** — credential showcase with links and images
- **Contact** — contact form wired to the backend message store
- **Theme System** — light/dark mode toggle with persistent preference
- **Responsive** — fully responsive across mobile, tablet, and desktop
- **SEO** — per-page meta tags, Open Graph, sitemap, robots.txt, structured data

### Admin Dashboard

- Secure **JWT authentication** with protected routes
- **Dashboard** — stats, recent messages, quick actions
- **Full CRUD** for projects, skills, certificates, experience, education, and messages
- **Image uploads** to Cloudinary (cover, gallery, icons, resume)
- **Profile & Settings** — update profile info, change password
- **Real-time form validation** with react-hook-form

---

## Tech Stack

### Frontend (`client/`)

| Area          | Technology                        |
| ------------- | --------------------------------- |
| Framework     | React 19 + Vite 8                 |
| Styling       | Tailwind CSS v4                   |
| Routing       | React Router 7 (BrowserRouter)    |
| Animations    | Framer Motion                     |
| Forms         | React Hook Form                   |
| HTTP          | Axios                             |
| Icons         | react-icons, lucide-react         |
| Toast         | react-hot-toast                   |
| Misc          | date-fns, @fontsource/inter & space-grotesk |

### Backend (`server/`)

| Area            | Technology                              |
| --------------- | --------------------------------------- |
| Runtime         | Node.js                                 |
| Framework       | Express 5                               |
| Database        | MongoDB + Mongoose 9                    |
| Auth            | JWT + bcryptjs                          |
| File Uploads    | Multer + Cloudinary                     |
| Security        | Helmet, CORS, express-rate-limit        |
| Validation      | express-validator                       |
| Misc            | compression, dotenv, slugify            |

### Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas
- **Image Storage:** Cloudinary

---

## Project Structure

```
portfolio/
├── client/                     # React (Vite) frontend
│   ├── public/                 # Static assets (favicon, og-image, robots, sitemap)
│   ├── src/
│   │   ├── components/         # UI, layout, section components
│   │   ├── pages/
│   │   │   ├── public/         # Public pages
│   │   │   └── admin/          # Admin pages
│   │   ├── routes/             # React Router config
│   │   ├── context/            # Auth, theme, portfolio data contexts
│   │   ├── hooks/              # Custom hooks
│   │   ├── services/           # API service layer
│   │   ├── utils/              # Helpers
│   │   └── config/             # Site config & constants
│   └── vercel.json             # SPA routing fallback
└── server/                     # Express backend
    ├── src/
    │   ├── config/             # DB & Cloudinary config
    │   ├── controllers/        # Route handlers
    │   ├── models/             # Mongoose models
    │   ├── routes/             # API routes
    │   ├── middleware/         # Auth, validation, rate limiters
    │   ├── services/           # Business logic
    │   ├── utils/              # Helpers (query builder, token, etc.)
    │   └── server.js           # Entry point
    └── .env.example
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas (or local MongoDB)
- Cloudinary account
- npm

### 1. Clone & install

```bash
git clone <your-repo-url>
cd portfolio

# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 2. Configure environment variables

**`client/.env`**

```
VITE_API_URL=http://localhost:5000/api
```

**`server/.env`** (see `server/.env.example`)

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 3. Create an admin account

```bash
cd server

# Set email + password, then run the seeder
$env:ADMIN_EMAIL="admin@example.com"
$env:ADMIN_PASSWORD="your-password-here"
npm run seed:admin
```

> The script connects to `MONGO_URI` from `server/.env`. Password must be at least 8 characters. Only one admin is created per email.

### 4. Run locally

```bash
# Backend (from server/)
npm run dev          # http://localhost:5000

# Frontend (from client/)
npm run dev          # http://localhost:5173
```

Open http://localhost:5173 and sign in at `http://localhost:5173/admin/login`.

---

## Scripts

### Client

| Command            | Description                 |
| ------------------ | --------------------------- |
| `npm run dev`      | Start Vite dev server       |
| `npm run build`    | Production build to `dist/` |
| `npm run preview`  | Preview the production build|
| `npm run lint`     | Run ESLint                  |

### Server

| Command             | Description                      |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start server with nodemon        |
| `npm start`         | Start server in production       |
| `npm run seed:admin`| Create an admin account          |

---

## API Overview

Base URL: `/api`

| Method | Endpoint            | Description          | Protected |
| ------ | ------------------- | -------------------- | --------- |
| POST   | `/auth/login`       | Admin login          | No        |
| GET    | `/auth/me`          | Current admin        | Yes       |
| PUT    | `/auth/password`    | Change password      | Yes       |
| GET    | `/profile`          | Public profile       | No        |
| GET/POST/PUT/DELETE | `/projects` | Project CRUD         | Mixed     |
| GET/POST/PUT/DELETE | `/skills`   | Skill CRUD           | Mixed     |
| GET/POST/PUT/DELETE | `/experience`| Experience CRUD      | Mixed     |
| GET/POST/PUT/DELETE | `/education`| Education CRUD       | Mixed     |
| GET/POST/PUT/DELETE | `/certificates` | Certificate CRUD | Mixed     |
| GET/POST/PUT/DELETE | `/messages`| Contact messages     | Mixed     |
| POST    | `/upload`           | File upload          | Yes       |

---

## Deployment

### Frontend (Vercel)

1. Push the repo to GitHub and import it into Vercel
2. **Root Directory:** `client`
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. Set env var: `VITE_API_URL=https://<your-backend-url>/api`

`client/vercel.json` provides the SPA rewrite so deep routes (e.g. `/admin`, `/projects`) work on direct visits.

### Backend (Render)

1. Create a **Web Service** from the `server/` directory
2. **Start Command:** `npm start`
3. Set all env vars from `server/.env` (`MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, Cloudinary keys, etc.)
4. `CLIENT_URL` should point to your Vercel domain

### Database (MongoDB Atlas)

- Whitelist Render's IP range in Atlas
- Use the connection string in the server's `MONGO_URI`

---

## Admin Setup on Production

After deploying the backend, create an admin pointing at the production database:

```bash
cd server
$env:ADMIN_EMAIL="admin@example.com"
$env:ADMIN_PASSWORD="your-password-here"
npm run seed:admin
```

Then sign in at `https://<your-frontend-url>/admin/login`.

---

## License

This is a personal project. All content and code are owned by the author.
