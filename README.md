# Pixcel Studio

## Local setup
1. Install Node.js 20+.
2. Run `npm install`
3. Run `npm run dev`
4. Open the Vite URL.

## Production
Run `npm run build`. Deploy `dist/` to Netlify.

## Decap CMS
The CMS is at `/admin/`. On Netlify:
1. Connect the GitHub repository.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Enable Netlify Identity.
5. Enable Git Gateway.
6. Invite the admin email.
7. Open `https://YOUR-DOMAIN/admin/`.
8. Portfolio images upload to `public/uploads/`; project data is stored in `content/portfolio/`.

## Customization
Edit `content/site.json` for the hero/contact details. Add portfolio/testimonial entries through CMS. Change colors in `src/styles.css` under `:root`.

The site uses Lucide icons only; no Instagram icon import is used, avoiding the common `Instagram is not exported` build error.
