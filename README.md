# Funderworks

Marketing site for Funderworks — a Charlotte, NC-based web studio building modern websites and business software for local service businesses.

**Stack:** Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion · Resend

---

## Local Development

### 1. Clone and install

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in:

| Variable | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | Yes | Get a free key at [resend.com](https://resend.com) |
| `CONTACT_FROM_EMAIL` | No | Leave empty in dev — defaults to `onboarding@resend.dev` (works without domain verification) |
| `CONTACT_TO_EMAIL` | No | Defaults to `hello@funderworks.studio` |

**For local testing:** leave `CONTACT_FROM_EMAIL` blank. The contact form action will use Resend's `onboarding@resend.dev` sender automatically — no domain verification needed.

**For production:** set `CONTACT_FROM_EMAIL` to a verified sender on `funderworks.studio` in Resend's dashboard, then add both variables in Vercel project settings.

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

Deployed on Vercel. Pushing to `main` triggers a production deploy automatically.

Set the following environment variables in Vercel project settings:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` (verified funderworks.studio sender)
- `CONTACT_TO_EMAIL`
