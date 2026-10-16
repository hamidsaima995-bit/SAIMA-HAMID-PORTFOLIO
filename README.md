# Saima Hamid Portfolio

My personal portfolio website. It introduces who I am, shows the products I have designed and built, and lets people download my CV and get in touch.

Live site: https://saima-hamid-portfolio-production.up.railway.app

## What is inside

The site is one page with a few sections:

- A hero intro with my role and tech stack
- An "About me" section
- A portfolio area where each project category opens up
- A flip book called "My Portfolio Projects" with a page and screenshot for each product
- A CV snapshot card with a download button
- A contact section (WhatsApp, email, GitHub)

## Tech

Plain HTML, CSS and JavaScript. No framework and no build step. The files are:

- `index.html`, the page structure
- `css/style.css`, all the styling
- `js/main.js`, the small scripts (theme toggle, the flip book, the image zoom viewer, CV download)
- `assets/`, the images and the CV PDF

## Running it

Because it is a static site, you can just open `index.html` in a browser. To test it the way it runs online, serve the folder:

```
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Deployment

Hosted on Railway as a static site. Pushing to the `main` branch updates the live site.

## Author

Saima Hamid, founder of Ninja Tech, Lahore.
Website: https://ninjatechdev.com
