# Merchant Skyview Media — Website

Professional drone photography landing page for Arizona real estate, hosted on GitHub Pages.

## Live Site

**https://trepin3.github.io**

## Setup Instructions

### 1. GitHub Pages

This repo is configured to serve from the `main` branch root. Once pushed to GitHub as `trepin3.github.io`, it will automatically be live.

```bash
git init
git add .
git commit -m "Initial launch"
git branch -M main
git remote add origin https://github.com/trepin3/trepin3.github.io.git
git push -u origin main
```

### 2. Formspree (Contact Form)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form
3. Copy your form ID (looks like `xabcdefg`)
4. In `index.html`, find `YOUR_FORMSPREE_ID` and replace it with your form ID
5. Test by submitting the contact form — you should receive an email

### 3. Google Analytics 4

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a new property for trepin3.github.io
3. Get your Measurement ID (starts with `G-`)
4. In `index.html`, uncomment the GA4 script block and replace `G-XXXXXXXXXX` with your ID

### 4. Google Ads Conversion Tracking

1. In your Google Ads account, go to Tools → Conversions
2. Create a new conversion action for phone calls
3. Get your Conversion ID and Label
4. In `index.html`, uncomment the Google Ads script block and replace `AW-XXXXXXXXXX`
5. In `script.js`, replace `AW-XXXXXXXXXX/YYYYYYY` with your conversion ID/label

### 5. Replace Placeholder Content

Search the codebase for these placeholders and update them:

| Placeholder | Replace With |
|-------------|-------------|
| ~~`(480) 555-0199`~~ | Done — updated to (602) 561-9574 |
| ~~`+14805550199`~~ | Done — updated to +16025619574 |
| `YOUR_FORMSPREE_ID` | Your Formspree form ID |
| `G-XXXXXXXXXX` | Your GA4 Measurement ID |
| `AW-XXXXXXXXXX` | Your Google Ads Conversion ID |
| `info@merchantskyview.com` | Your real email |
| Unsplash image URLs | Your own drone photos in `images/` |
| Testimonials | Real client testimonials |
| Social media `#` links | Your real social media URLs |

### 6. Images

Replace placeholder Unsplash images with your own drone photos:

- `images/hero-bg.jpg` — Hero background (1920x1080, compressed)
- `images/portfolio-1.jpg` through `portfolio-6.jpg` — Portfolio grid (800x600)
- `images/logo.png` — Your logo
- `images/favicon.ico` — Browser tab icon (32x32)
- `images/og-image.jpg` — Social sharing preview (1200x630)

Compress all images to under 200KB each using [squoosh.app](https://squoosh.app).

## Tech Stack

- HTML + Tailwind CSS (Play CDN) + vanilla JavaScript
- No build tools, no frameworks, no backend
- Formspree for form handling (free, 50 submissions/month)
- Hosted free on GitHub Pages

## Files

```
index.html              — Single-page landing site
style.css               — Custom CSS (animations, transitions)
script.js               — Interactivity (menu, counters, tracking)
marketing-strategy.md   — Complete marketing playbook
images/                 — Portfolio photos, logo, favicon
```
