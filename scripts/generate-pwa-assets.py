import os
import subprocess
import re
from PIL import Image, ImageDraw, ImageFont

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
icons_dir = os.path.join(root_dir, "public", "icons")
os.makedirs(icons_dir, exist_ok=True)

# 1. Master 512x512 squircle icon
master_svg = os.path.join(root_dir, "src", "favicon.svg")
master_512 = os.path.join(icons_dir, "icon-512x512.png")
subprocess.run(["sips", "-s", "format", "png", master_svg, "--out", master_512], check=True, capture_output=True)

# Generate standard resolutions from master 512
resolutions = [72, 96, 128, 144, 152, 192, 384]
for r in resolutions:
    out_png = os.path.join(icons_dir, f"icon-{r}x{r}.png")
    subprocess.run(["sips", "-z", str(r), str(r), master_512, "--out", out_png], check=True, capture_output=True)
print("Standard icons generated.")

# 2. Apple touch icon (180x180) - FULL BLEED SQUARE without transparent rounded corners
apple_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="voca-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF5C6C"/>
      <stop offset="50%" stop-color="#EF3B56"/>
      <stop offset="100%" stop-color="#C91842"/>
    </linearGradient>
    <linearGradient id="petal-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#FFF0EC"/>
    </linearGradient>
    <filter id="flower-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#800A23" flood-opacity="0.35"/>
    </filter>
    <path id="kikyou-petal" d="M 0,-300 C 5.0,-295.1 18.55,-287.5 34.34,-280.8 C 69.0,-266.3 117.0,-227.9 108.65,-173.7 C 106.5,-166.2 105.2,-161.9 101.75,-155.7 L 23.37,-40.74 L 0,-25 L -23.37,-40.74 L -101.75,-155.7 C -105.2,-161.9 -106.5,-166.2 -108.65,-173.7 C -117.0,-227.9 -69.0,-266.3 -34.34,-280.8 C -18.55,-287.5 -5.0,-295.1 0,-300 Z" fill="url(#petal-grad)"/>
  </defs>
  <rect width="512" height="512" fill="url(#voca-grad)"/>
  <g transform="translate(256, 256) scale(0.60)" filter="url(#flower-shadow)">
    <use href="#kikyou-petal" transform="rotate(0)"/>
    <use href="#kikyou-petal" transform="rotate(72)"/>
    <use href="#kikyou-petal" transform="rotate(144)"/>
    <use href="#kikyou-petal" transform="rotate(216)"/>
    <use href="#kikyou-petal" transform="rotate(288)"/>
    <circle cx="0" cy="0" r="50" fill="url(#petal-grad)" stroke="#E0294F" stroke-width="7"/>
    <circle cx="0" cy="0" r="21" fill="#E0294F"/>
  </g>
</svg>"""

temp_apple_svg = os.path.join(icons_dir, "temp_apple.svg")
with open(temp_apple_svg, "w") as f:
    f.write(apple_svg)

apple_180 = os.path.join(icons_dir, "apple-icon-180.png")
subprocess.run(["sips", "-s", "format", "png", "-z", "180", "180", temp_apple_svg, "--out", apple_180], check=True, capture_output=True)

# 3. Android Maskable icons (full bleed with safe zone padding)
maskable_512 = os.path.join(icons_dir, "manifest-icon-512.maskable.png")
maskable_192 = os.path.join(icons_dir, "manifest-icon-192.maskable.png")
subprocess.run(["sips", "-s", "format", "png", "-z", "512", "512", temp_apple_svg, "--out", maskable_512], check=True, capture_output=True)
subprocess.run(["sips", "-s", "format", "png", "-z", "192", "192", temp_apple_svg, "--out", maskable_192], check=True, capture_output=True)
if os.path.exists(temp_apple_svg):
    os.remove(temp_apple_svg)
print("Apple icon and maskables generated.")

# 4. Regenerate all 40 apple-splash PNGs to dark #0f172a with centered Kikyou logo and "Voca"
splash_files = [f for f in os.listdir(icons_dir) if f.startswith("apple-splash-") and f.endswith(".png")]
print(f"Regenerating {len(splash_files)} Apple splash screens to dark #0f172a...")

# Prepare centered logo badge
icon_img = Image.open(master_512).convert("RGBA")

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
    resized_icon = icon_img.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
    
    # Paste centered
    ix = (w - icon_size) // 2
    iy = (h - icon_size) // 2 - 20
    splash.paste(resized_icon, (ix, iy), resized_icon)
    
    # Draw "Voca" text below
    draw = ImageDraw.Draw(splash)
    f_size = max(20, int(icon_size * 0.28))
    f_title = ImageFont.truetype("/System/Library/Fonts/Avenir Next.ttc", f_size)
    draw.text((w // 2, iy + icon_size + 30), "Voca", fill=(248, 250, 252), font=f_title, anchor="mm")
    
    splash_path = os.path.join(icons_dir, sf)
    splash.save(splash_path, "PNG", optimize=True)

print("All splash screens regenerated successfully.")
