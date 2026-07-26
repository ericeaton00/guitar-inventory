# Images

Drop photos of your gear in this folder, then reference the filename in `data/inventory.json`
(the `"image"` field), e.g. `"image": "images/strat-front.jpg"`.

Tips:
- Keep filenames simple and lowercase, no spaces: `strat-front.jpg`, not `Strat Front.JPG`.
- A phone photo straight from your camera is usually 3-8 MB. Resize/compress before adding
  (aim for under ~500KB) so the repo doesn't balloon — most phone photo apps have a "resize"
  or "export small" option, or use `https://squoosh.app` in a browser.
- If an item has no photo yet, just leave the `"image"` field as `""` — the card will show
  "No image yet" instead of a broken image icon.
