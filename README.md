# ethanseung.com

A plain HTML, CSS and JS site with no build step.

## Editing content
**Everything lives in `js/data.js`.** Search for `PLACEHOLDER` to find what still needs filling in.

- **Photos:** put them in `photos/`, then run `python3 tools/photo-sizes.py` (keeps galleries from jumping around while photos load), and reference them like `"photos/century-1.jpg"`. An empty `""` shows a styled placeholder tile.
- **Headshot:** `headshot: "photos/headshot.jpg"`
- **Rides:** `miles`, `elevation`, and `profile` (a rough list of elevation numbers that draws the little climb line).
- **Eats:** Beli scores out of 10. The list sorts itself. Screenshots go in `beliScreens`.
- **Reads:** `type` is `"book"` or `"article"`. `tags` creates the filter buttons automatically.
- **Resume:** replace `assets/resume.pdf`.

To preview locally, open `index.html` in a browser, or run `python3 -m http.server` and go to localhost:8000.

## Deploy (GitHub + Vercel)
1. Create a repo at github.com/awesome4ce (e.g. `personal-site`) and push this folder to it.
2. On vercel.com, sign in with GitHub, choose **Add New → Project**, and import the repo. Framework preset: **Other**. No build command. Deploy.
3. Every `git push` redeploys the site. Pull requests get their own preview URLs.

## Custom domain
- **eseung.com:** first check WordPress.com → Upgrades → Domains to see whether you still own it. If you do, either change its DNS to point at Vercel or transfer it out to Cloudflare or Namecheap.
- **ethanseung.com:** buy it in Vercel (Domains tab) or on Namecheap or Cloudflare.
- In Vercel, open the project and go to **Settings → Domains**, then add the domain and follow the DNS records it gives you (an A record `76.76.21.21` for the apex, a CNAME `cname.vercel-dns.com` for `www`).
