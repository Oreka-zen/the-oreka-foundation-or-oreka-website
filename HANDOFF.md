# The Oreka Foundation — Website Handoff Guide

This folder contains the complete source code for theorekafoundation.org.
Everything needed to run the site is inside — no Lovable account is required.

## What's inside

- **TanStack Start** (React) website — a single editorial homepage with the
  foundation's story, mission, programs, and a Donate button.
- All images are bundled in `src/assets/` — the site is fully self-contained.
- There is no database or backend account to migrate.

## Option A — Free hosting on Cloudflare Pages (recommended)

Cloudflare Pages hosts this kind of site for free with automatic HTTPS.

1. **Put the code on GitHub** (free): create a repository at
   github.com/new, then upload this folder (or push it with git).
2. **Deploy**: at pages.cloudflare.com, sign up, choose
   **Create a project → Connect to Git**, and pick the repository.
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: 22 (set under environment variables as `NODE_VERSION = 22`)
3. Cloudflare gives the site a temporary address like
   `oreka-foundation.pages.dev`. Confirm the site opens there first.

## Connect the domain (Namecheap)

4. In the Cloudflare Pages project, go to **Custom domains → Add** and enter
   `theorekafoundation.org`, then repeat for `www.theorekafoundation.org`.
   Cloudflare will show the exact DNS records to create.
5. In Namecheap (**Domain List → Manage → Advanced DNS**), add the records
   Cloudflare shows — typically:
   - **A Record** for `@` pointing to Cloudflare's IP
   - **CNAME Record** for `www` pointing to `oreka-foundation.pages.dev`
   - Delete any old parking/redirect records Namecheap created.
   - If Namecheap won't accept the root record, the easiest fix is to switch
     the domain's **Nameservers** to Cloudflare's (shown on the same screen);
     Cloudflare then manages DNS and connects both records automatically.
6. Wait for DNS to take effect (minutes to a few hours, up to 72h worst case).
   HTTPS is issued automatically.

## Run it on a computer (optional)

```sh
npm install
npm run dev
```

Open http://localhost:8080.

## Local testing before going live

```sh
npm run build
```

The production build lands in `dist/`.

## Donation button

The Donate button currently opens a notice that online giving is not yet
available. When the foundation has an approved payment destination (e.g. a
Zelle account, bank details, or a GoFundMe link), have a developer point the
button's action there — it's a one-line change in `src/routes/index.tsx`.

---
Built for The Oreka Foundation. Contact: the site owner should keep this
repository and the Cloudflare account under the foundation's own email.
