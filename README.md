# Hammad Toufeeq | Portfolio

Personal portfolio of **Hammad Toufeeq**, MERN Stack Developer in Lahore, Pakistan.

Built with React 19, TypeScript, Vite, Tailwind CSS 4, Motion (animations) and Lenis (smooth scroll). No backend needed.

## Run locally

```bash
npm install
npm run dev
```

## Deploy on Vercel (free)

1. Go to https://vercel.com/new and import this GitHub repository.
2. Vercel detects Vite automatically. Keep the defaults and press **Deploy**.
3. Every push to the main branch redeploys the site.

## Edit content

All text (experience, projects, skills, links) lives in `src/data.ts`.

## Resume PDF

The resume is `public/Hammad-Toufeeq-Resume.pdf`, generated from `resume/resume.html`.
After editing the HTML, regenerate it with Playwright:

```bash
npx playwright install chromium   # first time only
node resume/build-resume.cjs
```

## Contact form

The form sends messages straight to hammadtoufeeq02@gmail.com through [Web3Forms](https://web3forms.com), with no backend.
The access key in `src/components/Contact.tsx` is public by design. Manage the form (and see past submissions) in the Web3Forms dashboard.
If a request takes longer than 15 seconds, the form stops waiting and shows an error with the email address instead.
