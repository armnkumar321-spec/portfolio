# Aman Kumar — 3D Portfolio
React + TypeScript + Vite + Tailwind v4 + React Three Fiber + Framer Motion.

## Run locally
    npm install
    npm run dev        # http://localhost:5173

## Before you publish (TODOs)
1. `src/data/content.ts` → add your `email`; add AI Digital Twin, PocketCode, GraphFall and Campus Placement Drive once their repos are public; write proper descriptions for repos that have none on GitHub.
2. Put your resume at `public/resume.pdf`.
3. Contact form: get a free key at https://web3forms.com, copy `.env.example` to `.env`, and set the same variable in Vercel → Settings → Environment Variables.
4. Replace `YOUR-DOMAIN` in `public/robots.txt` and `public/sitemap.xml`.

## Push to GitHub
    git init && git add . && git commit -m "Initial portfolio"
    git branch -M main
    git remote add origin https://github.com/armnkumar321-spec/portfolio.git   # create the empty repo on GitHub first
    git push -u origin main

## Deploy on Vercel
vercel.com → Add New → Project → import `portfolio` → Framework: Vite → Deploy. Every push to `main` will redeploy it.

## Custom domain
Buy a domain (Namecheap, GoDaddy, Cloudflare; e.g. amankumar.dev). In Vercel → Project → Settings → Domains, add it, then add the DNS records Vercel shows you (an A record `76.76.21.21` for the root and a CNAME `cname.vercel-dns.com` for `www`) at your registrar. HTTPS is set up automatically.
