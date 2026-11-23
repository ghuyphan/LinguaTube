import os
import re
from PIL import Image, ImageDraw, ImageFont

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
icons_dir = os.path.join(root_dir, "public", "icons")

# The installed artwork follows the native app. The browser mark is generated separately.
icon_img = Image.open(os.path.join(icons_dir, "icon-512x512.png")).convert("RGBA")
maskable_img = Image.open(os.path.join(icons_dir, "manifest-icon-512.maskable.png")).convert("RGB")

for size in [72, 96, 128, 144, 152, 192, 384]:
    icon_img.resize((size, size), Image.Resampling.LANCZOS).save(
        os.path.join(icons_dir, f"icon-{size}x{size}.png"), optimize=True
    )

icon_img.resize((180, 180), Image.Resampling.LANCZOS).save(
    os.path.join(icons_dir, "apple-icon-180.png"), optimize=True
)
maskable_img.resize((192, 192), Image.Resampling.LANCZOS).save(
    os.path.join(icons_dir, "manifest-icon-192.maskable.png"), optimize=True
)

with Image.open(os.path.join(icons_dir, "brand-fox.png")) as source:
    splash_icon = source.convert("RGB")

splash_files = [f for f in os.listdir(icons_dir) if f.startswith("apple-splash-") and f.endswith(".png")]
print(f"Regenerating {len(splash_files)} Apple splash screens to dark #0f172a...")

for sf in splash_files:
    # Parse width and height from name e.g. apple-splash-1170-2532.png
    m = re.match(r"apple-splash-(\d+)-(\d+)\.png", sf)
    if not m:
        continue
    w, h = int(m.group(1)), int(m.group(2))
    
    # Create dark #0f172a canvas
    splash = Image.new("RGB", (w, h), (15, 23, 42)) # #0f172a
    
    # Determine icon size based on screen size (min dimension * 0.22)
    icon_size = max(96, min(int(min(w, h) * 0.22), 220))
    resized_icon = splash_icon.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
    
    # Paste centered
    ix = (w - icon_size) // 2
    iy = (h - icon_size) // 2 - 20
    splash.paste(resized_icon, (ix, iy))
    
    # Draw "Voca" text below
    draw = ImageDraw.Draw(splash)
    f_size = max(20, int(icon_size * 0.28))
    f_title = ImageFont.truetype("/System/Library/Fonts/Avenir Next.ttc", f_size, index=0)
    draw.text((w // 2, iy + icon_size + 30), "Voca", fill=(248, 250, 252), font=f_title, anchor="mm")
    
    splash_path = os.path.join(icons_dir, sf)
    splash.save(splash_path, "PNG", optimize=True)

print("All splash screens regenerated successfully.")
