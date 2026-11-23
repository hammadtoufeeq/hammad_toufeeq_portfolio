"""Resume content. Edit text here, then run:  python3 build_resume.py  (from this folder)."""

NAME = "Hammad Toufeeq"
TITLE = "FULL STACK DEVELOPER"
CONTACT = "Lahore, Pakistan | (+92) 306-1694526 | hammadtoufeeq02@gmail.com"
EMAIL = "hammadtoufeeq02@gmail.com"
LINKS = [
    ("LinkedIn", "https://www.linkedin.com/in/hammad-toufeeq/"),
    ("GitHub", "https://github.com/hammadtoufeeq"),
    ("Portfolio", "https://hammad-toufeeq-portfolio.vercel.app/"),
]

SUMMARY = (
    "Full Stack Developer with 5 months of hands-on experience building and shipping production web applications "
    "using React, TypeScript, Node.js and MongoDB, with a strong focus on backend and REST API design. Recently "
    "launched Influnexa, a multi-role talent marketplace featuring JWT and Google OAuth authentication, role-based "
    "access control and a milestone-based agreement workflow, and delivered a paid client website with an admin CRM. "
    "Open to onsite and remote roles."
)

SKILLS = [
    ("Languages", "TypeScript, JavaScript (ES6+), HTML5, CSS3"),
    ("Frontend", "React.js, Next.js, Tailwind CSS, React Router, TanStack Query, i18next"),
    ("Backend", "Node.js, Express.js, REST API Design, MVC, JWT Authentication, Google OAuth, RBAC, Zod, Nodemailer, Multer"),
    ("Databases", "MongoDB, Mongoose, Supabase (PostgreSQL)"),
    ("Testing & Security", "Jest, Supertest, Playwright, Helmet, bcrypt, Rate Limiting, Input Validation"),
    ("Tools & Deployment", "Git, GitHub, Vercel, Vite, Postman, VS Code"),
    ("Spoken Languages", "English (Professional), Urdu (Native)"),
]

# (title line, dates, bullets)
EXPERIENCE = [
    (
        "MERN Stack Developer Intern | Axcel, Lahore, Pakistan",
        "Jul 2026 – Present",
        [
            "Solo-developed and launched Influnexa (influnexa.com), a multi-role talent marketplace connecting businesses with creators, journalists and experts, using React, TypeScript, Node.js, Express and MongoDB, delivered in 3 weeks.",
            "Designed a secure REST API (Express 5, MVC) with Zod validation, JWT cookie authentication, Google OAuth, rate limiting and Helmet, optimized with caching, pagination and database indexing.",
            "Implemented role-based access control with dashboards for 4 roles (Admin, Business, Manager, Talent) and an admin approval workflow for verifying accounts.",
            "Built a digital agreement and milestone-based payment workflow, with email one-time-code signing and in-app revision requests from both parties.",
            "Delivered a mobile-first UI in English, Urdu and Arabic (RTL) with dark mode; wrote 20+ API tests with Jest and Supertest; deployed on Vercel and resolved post-launch bugs.",
        ],
    ),
    (
        "SAP Intern | Fauji Fertilizer Company (FFC), Commercial Tower, Lahore",
        "May 2026 – Jun 2026",
        [
            "Trained hands-on in SAP ERP across the Materials Management (MM) and Finance (FI) modules, working onsite with standard transaction codes (ME51N, ME21N, MIGO, MIRO).",
            "Supported the procure-to-pay cycle: purchase requisitions, purchase orders, goods receipt and invoice verification, along with the resulting postings in SAP FI.",
        ],
    ),
]

# (title line, bullets)
PROJECTS = [
    (
        "Influnexa – Talent Marketplace Platform | React, TypeScript, Node.js, Express, MongoDB",
        ["Full-stack marketplace with talent search and filters, hire requests, campaigns, shortlists, digital agreements, milestone-based delivery and two-way reviews."],
    ),
    (
        "Skylure Jet – Private Aircraft Advisory Website (Freelance Client Project)",
        ["Built solo and launched a paid client website on a custom domain, with Buy/Sell inquiry forms and an admin CRM dashboard to manage inquiries and send price quotes."],
    ),
    (
        "GlowBot – AI Skin Analysis App (Final Year Project)",
        ["Detects acne, dark circles and pigmentation from a photo, then suggests treatments, a diet plan and nearby dermatologists to book."],
    ),
]

EDUCATION = ("BS Computer Science | University of Central Punjab (UCP), Lahore, Pakistan", "CGPA: 3.29")

CERTIFICATIONS = ["Introduction to Generative AI | Coursera | Credential ID: H6LBWZ58OGG2"]

# Plain-text URLs at the bottom of the page, for ATS systems that ignore link annotations
FOOTER = "linkedin.com/in/hammad-toufeeq | github.com/hammadtoufeeq | hammad-toufeeq-portfolio.vercel.app"
