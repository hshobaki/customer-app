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
npm run dev
```

4. Open http://localhost:3000

Notes
- The server will create the `customers` table automatically on start if it doesn't exist.