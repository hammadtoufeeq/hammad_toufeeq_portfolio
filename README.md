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

## Contact form (optional: EmailJS)

Without setup, the form opens the visitor's email app with their message filled in.
To have messages sent straight to your inbox:

1. Create a free account at https://www.emailjs.com and connect your Gmail (Email Services).
2. Create an Email Template that uses `{{name}}`, `{{email}}` and `{{message}}`.
3. In Vercel → Project → Settings → Environment Variables, add:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
4. Redeploy.
