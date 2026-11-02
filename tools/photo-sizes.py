#!/usr/bin/env python3
"""Run after adding photos:  python3 tools/photo-sizes.py
Writes js/photo-sizes.js so galleries can reserve each photo's space (no layout jumps)."""
import json, pathlib
from PIL import Image
root = pathlib.Path(__file__).resolve().parent.parent
sizes = {}
for p in sorted((root / "photos").glob("*")):
    if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}:
        with Image.open(p) as im:
            sizes[f"photos/{p.name}"] = round(im.width / im.height, 4)
(root / "js" / "photo-sizes.js").write_text("window.PHOTO_SIZES = " + json.dumps(sizes, indent=1) + ";\n")
print(f"{len(sizes)} photos")
