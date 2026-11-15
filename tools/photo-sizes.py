#!/usr/bin/env python3
"""Run after adding photos:  python3 tools/photo-sizes.py
1. Makes small fast WebP copies of every photo in photos/ (photos/web/<name>-800.webp and -1400.webp)
2. Writes js/photo-sizes.js so galleries reserve each photo's space (no layout jumps)."""
import json, pathlib
from PIL import Image, ImageOps
root = pathlib.Path(__file__).resolve().parent.parent
web = root / "photos" / "web"; web.mkdir(exist_ok=True)
sizes, made = {}, 0
for p in sorted((root / "photos").glob("*")):
    if p.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
        continue
    with Image.open(p) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")
        sizes[f"photos/{p.name}"] = round(im.width / im.height, 4)
        if p.suffix.lower() in {".jpg", ".jpeg"}:
            for w in (800, 1400):
                out = web / f"{p.stem}-{w}.webp"
                if not out.exists() or out.stat().st_mtime < p.stat().st_mtime:
                    c = im.copy(); c.thumbnail((w, w)); c.save(out, "WEBP", quality=78, method=6); made += 1
(root / "js" / "photo-sizes.js").write_text("window.PHOTO_SIZES = " + json.dumps(sizes, indent=1) + ";\n")
print(f"{len(sizes)} photos, {made} web copies made")
