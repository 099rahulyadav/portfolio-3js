# profile-new

The Rahul yadavportfolio converted into a **Next.js App Router project using JavaScript and JSX**, with Tailwind CSS, GSAP, Three.js, React Three Fiber, Drei, and Lenis.

## Run locally

```sh
git clone https://github.com/099rahulyadav/portfolio-3js.git
cd portfolio-3js
npm install
npm run dev
```

Open the URL printed by Next.js (normally `http://localhost:3000`). If port 3000 is occupied, Next.js chooses the next available port.

For a specific port:

```sh
node node_modules/next/dist/bin/next dev -p 3001
```

## Production and checks

```sh
npm run lint
npm run build
npm run start
npm run test
```

The build directory is `.next-app/`. Browser tests use port 3001 and automatically start the development server if one is not running. On Windows, tests use the installed Microsoft Edge browser. On other systems run `npx playwright install chromium` first. `PLAYWRIGHT_CHANNEL` can select another installed browser channel.

Recommended Node.js: 22.13 or newer. No TypeScript configuration or application files are used.

## Editing the portfolio

| File or folder | Edit here for |
| --- | --- |
| `src/content/home.json` | Home name, headline, clock, status, CTA text |
| `src/content/navigation.json` | Header logo and links |
| `src/content/about.json` | Biography, education, career, skills, contact and social links |
| `src/content/projects.json` | All six projects, details, screenshots and repository links |
| `src/content/project-copy.json` | Shared case-study labels and placeholder text |
| `src/content/achievements.json` | Certificates, categories and supporting images |
| `src/components/` | JSX components grouped by page and responsibility |
| `src/components/three/hero-head.jsx` | Robot, geometry, shaders and particle animation |
| `src/lib/motion.js` | Shared animation timings, easing and GSAP helpers |
| `src/lib/quality.js` | Device quality levels and rendering budgets |
| `src/app/globals.css` | Tailwind, local fonts, custom animations and visual styles |
| `public/` | Images, fonts, logos and `robot.glb` |

The project list and detail routes share `projects.json`; add a project with a unique `slug` to generate another detail route automatically. `generateStaticParams` builds all project routes, and unknown slugs return a 404.

## Included pages and interactions

- Home with logo intro, animated robot, live clock, text scrambling and liquid CTA.
- About with particle portrait, education, career timeline, skills and contact anchors.
- Projects with animated desktop rail and responsive mobile cards.
- Six case studies, screenshot galleries, modal previews and next-project navigation.
- Achievements with certificate grid, pan/hover effects and certificate previews.
- Responsive navigation, pixel transitions, custom cursor, smooth scrolling, and reduced-motion support.

## Migration notes

This runs as native Next.js pages and React components. It does **not** serve captured HTML, replay an old Next runtime, use an iframe, or depend on `D:\project\portifolio1` at runtime. Tailwind rebuilds utility styles from the JSX files; libraries come from npm; media and fonts are local.

The earlier project was a capture of the published website. The component source and animation logic were recovered from those assets and adapted to normal ES modules and JSX. This is not the author's original source repository, and some recovered local variable names remain compact. Obsolete migration scripts and intermediate extracted data have been removed; the maintained application lives in `src/`.

The original portfolio's text, branding, external links and intentionally empty project/certificate placeholders are retained. Email links use the visitor's mail application; no contact backend, CMS, credentials, analytics or admin panel is configured. `public/` assets can be replaced without an external media service.

See `docs/verification.md` for the validation scope.
