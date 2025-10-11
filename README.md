## RA Chemicals - One Page Website

A responsive one-page business website built with semantic HTML5, modern CSS (Flexbox/Grid), and vanilla JavaScript. No frameworks or UI libraries.

### Structure

```
index.html
css/styles.css
js/main.js
assets/
  logo.svg
  hero.svg
  about.svg
  product-1.svg ... product-6.svg
  gallery-1.svg ... gallery-6.svg
  brochure.pdf
```

### Editing Content

- Logo: Replace `assets/logo.svg` and ensure `index.html` header/footer `<img>` src point to it.
- Hero background: Update `.hero-media` background in `css/styles.css` (path `../assets/hero.svg`).
- About image: Replace `assets/about.svg`.
- Products:
  - Update images `assets/product-*.svg`.
  - Edit product cards in `index.html` within `#product-grid`. Supported `data-category`: `water`, `textile`, `cleaning` (extend as needed).
  - Brochure: replace `assets/brochure.pdf` and keep links pointing to it.
- Gallery: Replace `assets/gallery-*.svg`; keep meaningful `alt` text.
- Contact details & map:
  - Update address, email `mailto:`, and phone `tel:` in Contact + Footer of `index.html`.
  - Change Google Maps by editing the iframe `src` query (e.g., `q=Hyderabad%2C%20India`).

Inline comments in HTML/CSS/JS show exactly where to change assets and details.

### JavaScript Features

- Mobile navigation toggle with `aria-expanded`.
- Sticky header background after scroll.
- Smooth scrolling to anchors.
- Product category filter via dropdown.
- Gallery lightbox with keyboard navigation (Esc, ←, →).
- Contact form client-side validation with friendly messages.
- Auto-updating footer year.

### Development

No build tools required. Open `index.html` in a browser.

Optional local server:

```bash
python -m http.server 5500
# or
npx serve . -l 5500 --single
```

### Deployment

#### Netlify
- Drag-and-drop the folder to Netlify or connect a Git repo.
- Build command: none. Publish directory: root.

#### GitHub Pages
- Push to GitHub → Settings → Pages → Deploy from branch (root).

### Notes

- No external frameworks are used.
- Optimize/replace images for performance.


