# The Shop Ledger

A tiny, no-backend inventory tracker for guitars, parts, amps, and equipment. All the data
lives in one JSON file. All the images live in one folder. The page is a static HTML/CSS/JS
viewer that reads both. No database, no build step, no server.

This doubles as a git/GitHub practice project — every time you add or sell gear, you'll
practice the same core workflow: edit → commit → push.

## What's in here

```
guitar-inventory/
├── index.html          the page itself
├── style.css           look and feel
├── app.js              reads the data, renders cards, handles search/filter/sort
├── data/
│   └── inventory.json  every item lives here — edit this to add/change gear
├── images/
│   └── (your photos go here)
└── README.md
```

The four sample entries in `data/inventory.json` are placeholders — delete them once you've
added your own gear, or just overwrite them.

## Part 1 — Get this onto GitHub

You said you've got some git exposure already, so this is a refresher, not a from-scratch
tutorial. Skim past anything you already know.

**1. Create the repo on GitHub first** (easiest for beginners-again):
   - Go to github.com → **New repository** → name it `guitar-inventory` → **do not**
     check "add a README" (we already have one) → Create repository.
   - GitHub will show you a remote URL like `https://github.com/yourname/guitar-inventory.git`
     — keep that tab open.

**2. Point your local folder at it:**
```bash
cd path/to/guitar-inventory
git init
git add .
git commit -m "Initial commit: ledger structure and sample data"
git branch -M main
git remote add origin https://github.com/yourname/guitar-inventory.git
git push -u origin main
```

A quick refresher on what each line actually does, since it's easy to type these on
autopilot:
- `git init` — turns this folder into a git repo (creates a hidden `.git` folder tracking history).
- `git add .` — stages every changed file, telling git "include this in the next commit."
- `git commit -m "..."` — takes a snapshot of the staged files with a message describing why.
- `git branch -M main` — makes sure your default branch is named `main` (GitHub's default).
- `git remote add origin <url>` — tells your local repo where "origin" (GitHub) lives.
- `git push -u origin main` — uploads your commits to GitHub; `-u` remembers this pairing
  so future pushes can just be `git push`.

## Part 2 — Turn it into a viewable site (GitHub Pages)

1. On GitHub, go to your repo → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)` → **Save**.
4. Wait ~1 minute, then refresh — GitHub shows you a URL like
   `https://yourname.github.io/guitar-inventory/`. That's your live inventory page.

Any time you push new commits to `main`, Pages rebuilds automatically within a minute or two.

## Part 3 — Your ongoing workflow (the combo: edit files + view the site)

This is the loop you'll repeat every time you buy, sell, or finish building something:

```bash
# 1. Add a photo (optional) to images/, e.g. images/strat-front.jpg

# 2. Open data/inventory.json and add a new entry (copy an existing one as a template):
```
```json
{
  "id": "guitar-002",
  "category": "guitar",
  "name": "Telecaster-style Build",
  "brand": "Shop-built",
  "model": "T-Style #1",
  "year": 2026,
  "serial": "",
  "condition": "In progress",
  "price_paid": 210,
  "price_notes": "Body + neck kit from StewMac",
  "current_value_estimate": 300,
  "image": "images/strat-front.jpg",
  "notes": "Swamp ash body, roasted maple neck.",
  "tags": ["build-in-progress"]
}
```
```bash
# 3. Save the file, then commit and push:
git add .
git commit -m "Add Telecaster-style build"
git push
```

Refresh your GitHub Pages URL and the card shows up. That's the whole loop.

### Field reference for `data/inventory.json`

| Field | What it's for |
|---|---|
| `id` | Unique string, just needs to not repeat |
| `category` | One of `guitar`, `amp`, `part`, `equipment` (controls the filter tab and tag color) |
| `name`, `brand`, `model`, `year` | Basic identification |
| `condition` | Free text: `New`, `Excellent`, `In progress`, etc. |
| `price_paid` | Number, no `$` or commas |
| `price_notes` | Free text — where you bought it, what else was in the deal, etc. |
| `current_value_estimate` | Number — your own estimate, used for the running total |
| `image` | Relative path like `images/filename.jpg`, or `""` if none yet |
| `notes` | Free text, shows on the card |
| `tags` | Array of short strings, searchable |

## Handy git commands you'll actually use here

- `git status` — see what's changed before you commit. Run this often.
- `git log --oneline` — see your commit history at a glance.
- `git diff` — see exactly what changed in a file before staging it.
- `git checkout -- data/inventory.json` — discard uncommitted changes to that file if you
  made a mistake and haven't committed yet.

## If you want to go further later

- **Branches**: try `git checkout -b add-amp-collection` before a big batch of edits, then
  merge it back with a pull request on GitHub instead of committing straight to `main`.
  Good next step once the basic loop feels boring.
- **Multiple category files**: if `inventory.json` gets long, you could split it into
  `data/guitars.json`, `data/amps.json`, etc. and update `app.js` to fetch and merge them.
# guitar-inventory
# guitar-inventory
