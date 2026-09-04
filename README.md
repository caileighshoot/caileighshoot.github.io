# Personal website, Caileigh Shoot

A static site (HTML/CSS/JS, no build step) ready to host on GitHub Pages.

## Files

- `index.html`, all page content
- `styles.css`, all styling
- `script.js`, small bits of interactivity (mobile nav, footer year)
- `assets/caileigh.jpg`, your photo, already resized for web
- `robots.txt`, explicitly allows search engines *and* AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) to read the site
- `sitemap.xml`, tells search engines what pages exist
- `llms.txt`, a plain-text summary of who you are and what you do, written for AI assistants to read directly (an emerging convention some AI crawlers check for)

## AI & search discoverability

A few things were added specifically so that when someone asks an AI assistant or search engine for a "data scientist" or "remote sensing scientist" in Munich, this site has a better chance of surfacing:

- **Structured data (JSON-LD)** in `index.html`'s `<head>`, a machine-readable summary of your name, job, location (Munich), skills, employer, education, and social links, using schema.org's `Person` format. This is the same format Google and many AI tools use to understand "who is this page about."
- **Meta tags** for location (`geo.region`, `geo.placename`), Open Graph, and Twitter Card, so links to your site preview correctly and carry location signals.
- **`robots.txt`** explicitly allows AI crawlers rather than leaving them to a default that might block them.
- **`llms.txt`**, a concise, structured summary some AI tools look for when crawling a site.

### One important thing to update

All of these files currently assume your site will live at `https://caileighshoot.github.io/` (the canonical URL, Open Graph tags, sitemap, and JSON-LD all reference it). If you deploy to a different URL (say, a custom domain, or a project page like `caileighshoot.github.io/portfolio`), update that URL in:
- `index.html` (the `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image` tags, and the `"url"` and `"image"` fields in the JSON-LD block)
- `sitemap.xml`
- `robots.txt` (the `Sitemap:` line)

### Getting indexed faster

Search engines and AI crawlers find sites faster if you submit them directly:
- Submit your sitemap in [Google Search Console](https://search.google.com/search-console)
- Submit your sitemap in [Bing Webmaster Tools](https://www.bing.com/webmasters) (Bing's index also feeds ChatGPT's search and Microsoft Copilot)
- Add your site URL to your LinkedIn and GitHub profiles, both are crawled frequently and help establish that the site is really you

None of this guarantees showing up in any specific AI tool's answers (that depends on each tool's own search/retrieval behavior, which changes over time), but it removes the common technical reasons a personal site gets skipped.

## Deploy to GitHub Pages

1. Create a new repo on GitHub named `caileighshoot.github.io` (this exact name makes it live at that URL automatically). If you'd rather host it as a project page instead, any repo name works, it'll just live at `caileighshoot.github.io/repo-name`.
2. Upload all the files in this folder to the repo, keeping the `assets/` folder structure intact.
3. In the repo, go to **Settings → Pages**, and under "Build and deployment," set **Source** to "Deploy from a branch," branch `main`, folder `/ (root)`.
4. Save. GitHub will publish it in a minute or two at the URL shown on that settings page.

## Things you'll want to update

- **CV download button**: the button in the hero currently links to `assets/Caileigh-Shoot-CV.pdf`, which isn't included. Export your CV as a PDF, name it exactly that, and drop it in the `assets/` folder, or change the `href` on the `#cv-link` element in `index.html` to point wherever you'd rather host it.
- **Phone number**: left off the contact section by default for privacy. Add it to the `.contact-links` block in `index.html` if you want it public.
- **More projects**: right now there's one featured project (the Alaska thesis work) inside `.projects-grid`. To add another, duplicate the `.project-card-compact` block in the Projects section and give it its own content, the grid will automatically fit a second card alongside it.
- **Gallery photos**: the slideshow images live in `assets/gallery/`. To add, remove, or reorder photos, duplicate or edit the `<figure class="slide">` blocks in the Gallery section of `index.html`, and update the alt text to describe each new photo.

## Local preview

Since there's no build step, you can just open `index.html` directly in a browser, or run a quick local server from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
