# Customer App (Node.js + PostgreSQL)

Simple CRUD app for customers.

Prerequisites
- Node.js
- PostgreSQL server (local or remote)

Setup
1. Install dependencies:

```bash
npm install
```

2. Create a Postgres database (example):

```bash
createdb customerdb
```

3. Set `DATABASE_URL` (PowerShell):

```powershell
#$env:DATABASE_URL = "postgresql://user:pass@host:5432/customerdb"
$env:DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/customerdb"
 $env:DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/customerdb"
 npm run dev
```

4. Open http://localhost:3000

Notes
- The server will create the `customers` table automatically on start if it doesn't exist.

Vercel + Supabase deployment (quick)

1. Create a Supabase project at https://app.supabase.com and run the SQL in `supabase/init.sql` to create the `customers` table.
2. In Supabase project Settings -> Database, copy the Postgres connection string and set it as `DATABASE_URL` in Vercel's Environment Variables for the project.
3. On Vercel, import the GitHub repo `hshobaki/customer-app`.
4. Vercel will deploy the static frontend and serverless API under `/api/*` routes (we added `api/customers/*` serverless handlers). No extra build step required.
5. After deploy, open the Vercel URL and verify CRUD operations.

Files added for Vercel & Supabase
- `api/customers/index.js` : serverless handler for GET (list) and POST (create)
- `api/customers/[id].js` : serverless handler for GET/PUT/DELETE on a single customer
- `supabase/init.sql` : SQL to create `customers` table

If you want, I can deploy to Vercel and connect Supabase for you — provide a Vercel token and Supabase service key. Otherwise follow the steps above.