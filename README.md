# Portfolio CMS

A portfolio site inspired by nnamdiazubuike.dev, rebuilt with an emerald
accent instead of yellow, and with every section (profile, projects,
experience, posts) editable through a built-in admin dashboard instead of
being hardcoded.

## Stack

- Next.js 16 (App Router, patched for the May 2026 middleware/proxy CVEs)
- React 19
- MongoDB + Mongoose
- Tailwind CSS
- Custom cookie/JWT-based admin auth (no third-party auth service)

## Security notes

- Route protection lives in `proxy.js` (Next.js 16 renamed the
  `middleware.js` convention to `proxy.js` — same mechanism, new name).
  It redirects unauthenticated visitors away from `/admin/*`.
- As defense in depth, every write endpoint (`PUT`/`POST`/`DELETE` in
  `app/api/**/route.js`) independently re-verifies the session cookie via
  `lib/requireAuth.js`, so a proxy-layer bypass alone can't write data —
  the API layer checks again regardless of how the request arrived.
- Dependencies are audited with `npm audit` and currently show zero known
  vulnerabilities. Run `npm audit` periodically and keep Next.js on a
  patched line — Next.js 13.x/14.x no longer receive security patches, so
  don't downgrade below 15.5.18 / 16.2.6.

## 1. Local setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

- `MONGODB_URI` — create a free cluster at https://www.mongodb.com/cloud/atlas,
  add a database user, allow network access from anywhere (0.0.0.0/0) for
  simplicity, then copy the connection string. Add a database name at the
  end, e.g. `.../portfolio?retryWrites=true...`.
- `JWT_SECRET` — any long random string, e.g. run `openssl rand -hex 32`.
- `ADMIN_USERNAME` — whatever username you want to log in with.
- `ADMIN_PASSWORD_HASH` — run:

  ```bash
  npm run hash-password -- yourChosenPassword
  ```

  and paste the printed hash into `.env.local`.
- `SEED_SECRET` — any random string, used once to trigger seeding on a
  hosted environment.

## 2. Seed starter content

```bash
npm run seed
```

This fills in a starter profile, two example projects (MediRun and The
Shepherd's Fold), one experience entry, and one post — all editable
immediately from the admin dashboard.

## 3. Run locally

```bash
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin/login

## 4. Editing content

Everything the public site shows comes from MongoDB, via the admin
dashboard:

- **/admin/profile** — name, role, tagline, bio, hero CTA, contact info,
  WhatsApp link, resume link, social links, SEO title/description/image.
- **/admin/projects** — add/edit/delete featured work.
- **/admin/experience** — add/edit/delete work history entries.
- **/admin/posts** — add/edit/delete articles (title, excerpt, external
  link, tags, read time, date).

Nothing on the public pages is hardcoded — if a section has no content yet,
it's simply hidden until you add something.

## 5. Deploying to Render

1. Push this project to a GitHub repository.
2. On https://render.com, create a **New Web Service** and connect the repo.
3. Settings:
   - **Build command:** `npm install && npm run build`
   - **Start command:** `npm start`
   - **Environment:** Node
4. Add the same environment variables from `.env.local` (`MONGODB_URI`,
   `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `SEED_SECRET`) in
   Render's Environment tab. Make sure your MongoDB Atlas cluster's network
   access allows connections from anywhere, since Render's IPs aren't
   static on the free tier.
5. Deploy. Once live, visit:

   ```
   https://your-app.onrender.com/api/seed?secret=YOUR_SEED_SECRET
   ```

   once, to populate starter content in production (safe to call more than
   once — it only fills in empty collections).
6. Log in at `https://your-app.onrender.com/admin/login` and start editing.

## Project structure

```
app/
  page.js                 # homepage (hero, featured work, experience, posts)
  projects/                # /projects and /projects/[slug]
  experience/               # /experience
  articles/                 # /articles
  contact/                   # /contact
  admin/                     # admin dashboard (protected by middleware.js)
  api/                        # REST-ish API routes backing the CMS
lib/                          # db connection, auth helpers, data fetchers
models/                       # Mongoose schemas (Profile, Project, Experience, Post)
components/                   # Nav, Footer, AdminNav
scripts/                      # seed.js, hash-password.js
```

## Notes

- The contact form uses a `mailto:` link rather than a hosted email
  service, so no extra configuration is required. If you'd like it to send
  emails directly (e.g. via Resend or Nodemailer), that's a small addition
  to `app/api/` — ask and it can be added.
- To change the accent color again later, search for `emerald` across
  `app/` and `components/` and swap the Tailwind color family (e.g. to
  `sky`, `violet`, etc).
