# Migration verification

## Automated checks

- Production Next.js build with all ten public page routes generated.
- ESLint for JavaScript/JSX, React hooks, and undefined symbols.
- Playwright browser tests for home hydration and WebGL, client-side navigation to the contact anchor, all ten routes and local resource responses, certificate modal/Escape, mobile navigation with reduced motion, the project gallery modal, and unknown project 404s.

## Browser inspection

Inspected desktop layouts at 1440 × 900 and mobile layouts at 390 × 844 in Microsoft Edge. Verified the robot canvas, portrait, projects, certificate grid, mobile menu and lack of horizontal overflow. Browser automation reported no page exceptions or missing local assets on the ten routes.

## Migration fixes

- Replaced original framework/vendor bundles with npm packages and normal ES-module imports.
- Recovered page content into editable JSON and removed dependencies on captured React flight payloads.
- Restored JSX for components and meaningful names for page helpers.
- Replaced bundled 3D infrastructure with React Three Fiber and Drei (`Canvas`, `Center`, `useGLTF`).
- Guarded reduced-motion detection during server rendering.
- Made the intro resilient to React Strict Mode setup/cleanup in development.
- Fixed a namespace collision between Next Image and the browser Image constructor.
- Corrected character encoding in recovered components and removed nested main landmarks.
- Removed external media dependencies and centralized shared project data.

These checks establish that the converted project builds and its key flows work locally. They are not an exhaustive, frame-by-frame comparison against the live reference site across every GPU and browser.
