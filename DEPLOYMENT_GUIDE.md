# Malakesa Transfer & Tour — Invoice Manager
## Complete Deployment Guide

---

## OVERVIEW
This app is built with:
- **Next.js** (the web app framework)
- **Supabase** (your cloud database — free)
- **Resend** (email sending — free tier)
- **Vercel** (hosting — free)

Total cost to get started: **FREE**

---

## STEP 1 — Set up your database (Supabase)

1. Go to **https://supabase.com** and click "Start for free"
2. Sign up with your email (Google login works too)
3. Click **"New project"**
   - Name it: `malakesa-invoices`
   - Set a database password (save this!)
   - Choose the region closest to you (e.g. Singapore)
4. Wait ~2 minutes for the project to be created
5. Click **"SQL Editor"** in the left sidebar
6. Copy the ENTIRE contents of `supabase/schema.sql` (in this folder)
7. Paste it into the SQL editor and click **"Run"**
   - You should see "Success" — this creates your tables
8. Go to **Settings → API** in the left sidebar
9. Copy and save these two values:
   - **Project URL** (looks like: `https://abcdefg.supabase.co`)
   - **service_role** key (under "Project API keys" — NOT the anon key)

---

## STEP 2 — Set up email sending (Resend)

1. Go to **https://resend.com** and sign up for free
2. Click **"API Keys"** in the dashboard
3. Click **"Create API Key"**
   - Name: `malakesa-invoices`
   - Permission: Full access
4. Copy and save the API key (starts with `re_...`)

> **Note:** On the free plan, you can only send to your own verified email until you add a domain.
> To send to clients, go to Resend → Domains → Add your domain (e.g. malakesa.vu)
> OR for now, use the mailto fallback (app opens your email app instead)

---

## STEP 3 — Deploy to Vercel

1. Go to **https://github.com** and create a free account if you don't have one
2. Create a new repository called `malakesa-invoices`
3. Upload all the files from this folder to that repository
   (Or use GitHub Desktop app for an easier upload experience)
4. Go to **https://vercel.com** and sign up with your GitHub account
5. Click **"New Project"** → select your `malakesa-invoices` repository
6. Before clicking Deploy, click **"Environment Variables"** and add:

   | Variable name              | Value                          |
   |---------------------------|--------------------------------|
   | SUPABASE_URL              | (your Supabase project URL)    |
   | SUPABASE_SERVICE_KEY      | (your Supabase service_role key)|
   | RESEND_API_KEY            | (your Resend API key)          |
   | COMPANY_EMAIL             | info@malakesa.vu               |
   | COMPANY_NAME              | Malakesa Transfer and Tour     |
   | NEXT_PUBLIC_BASE_URL      | https://your-app.vercel.app    |

7. Click **"Deploy"** — wait about 2 minutes
8. Vercel gives you a URL like `malakesa-invoices.vercel.app`
   — that's your live app!

---

## STEP 4 — Use your app

Open your Vercel URL on any phone, tablet, or computer.

To give team members access, just share the URL. For a private login system,
let us know and we can add a password-protected login page.

---

## RUNNING LOCALLY (for testing on your computer)

If you have Node.js installed:

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env.local
# Then edit .env.local and fill in your real keys

# 3. Start the app
npm run dev

# 4. Open http://localhost:3000
```

---

## NEED HELP?

Common issues:

**"Error loading invoices"**
→ Check your SUPABASE_URL and SUPABASE_SERVICE_KEY in Vercel environment variables

**"Email not sending"**
→ Check RESEND_API_KEY; on free plan you can only email verified addresses
→ The app falls back to opening your email app if Resend fails

**"Invoice not found" after creating**
→ Make sure you ran the schema.sql in Supabase SQL editor

---

## FEATURES SUMMARY

| Feature                        | How it works                              |
|-------------------------------|-------------------------------------------|
| Create invoices               | Dashboard → New Invoice                   |
| Print invoices                | Invoice detail → Print button             |
| Email invoices to clients     | Invoice detail → Email button             |
| Record payments               | Invoice detail → Record payment           |
| Track unpaid invoices         | Unpaid page — sorted by due date          |
| Send payment reminders        | Unpaid page → Remind button               |
| Run reports                   | Reports page — filter by period           |
| Manage clients                | Clients page                              |
| Database / backup             | All data in Supabase (you own it)         |
