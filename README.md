# Harshini Kanamathareddy — Portfolio

Built with **Next.js 14** · Static export (deploys to Vercel/Netlify/GitHub Pages for free)

## Quick Start (Mac)

```bash
# 1. Install Node.js if you haven't: https://nodejs.org (download LTS)

# 2. Enter the project folder
cd harshini-portfolio

# 3. Install dependencies
npm install

# 4. Run locally
npm run dev
# Open http://localhost:3000
```

## Deploy to Vercel (FREE — everyone can see it)

```bash
# 1. Push to GitHub first
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/harshini-portfolio.git
git push -u origin main

# 2. Go to https://vercel.com → Import your GitHub repo → Deploy
# Done! You get a free URL like: harshini-portfolio.vercel.app
```

## Project Structure

```
src/
  app/
    page.js          ← Main page (assembles all sections)
    layout.js        ← HTML head, metadata, SEO
    globals.css      ← All styles
  components/
    Loader.js        ← Animated loading screen
    Cursor.js        ← Custom cursor
    Background.js    ← Animated particle canvas
    Wipe.js          ← Nav click portal transition
    ScrollEffects.js ← Scroll reveal + portal iris on scroll
    Navbar.js        ← Sticky navigation
    Hero.js          ← Landing hero section
    About.js         ← About + stats + trait chips
    Projects.js      ← Filterable projects + modal
    Skills.js        ← Marquee + physics playground
    Experience.js    ← Tabbed work history
    Leadership.js    ← Volunteering cards
    Timeline.js      ← Career timeline
    Contact.js       ← Contact form + links
    Footer.js        ← Footer
    PortalDivider.js ← Section divider with spinning ring
    SoftSkillScatter.js ← Floating soft skill cards
  lib/
    data.js

