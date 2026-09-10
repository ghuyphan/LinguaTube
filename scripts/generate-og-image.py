#!/usr/bin/env python3
"""
Generate a 1200x630 Apple-inspired chill pastel Open Graph preview image for Voca
"""
import os
import subprocess
from PIL import Image, ImageDraw, ImageFont

WIDTH = 1200
HEIGHT = 630

def main():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_png_path = os.path.join(root_dir, "public", "og-image.png")
    temp_svg_path = os.path.join(root_dir, "public", "og-base.temp.svg")
    temp_png_path = os.path.join(root_dir, "public", "og-base.temp.png")

    svg_bg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}">
  <defs>
    <linearGradient id="chill-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF6F4"/>
      <stop offset="40%" stop-color="#FDF1F5"/>
      <stop offset="75%" stop-color="#F5F0FB"/>
      <stop offset="100%" stop-color="#EDF4FD"/>
    </linearGradient>
    <radialGradient id="sun-orb" cx="25%" cy="28%" r="48%">
      <stop offset="0%" stop-color="#FFE6D9" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#FFE6D9" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="blush-orb" cx="75%" cy="38%" r="48%">
      <stop offset="0%" stop-color="#FCE1EC" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="#FCE1EC" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="sky-orb" cx="50%" cy="88%" r="45%">
      <stop offset="0%" stop-color="#E2EEFD" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#E2EEFD" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF7E93"/>
      <stop offset="50%" stop-color="#F45B74"/>
      <stop offset="100%" stop-color="#DF4360"/>
    </linearGradient>
    <filter id="pillowy-shadow" x="-40%" y="-20%" width="180%" height="180%">
      <feDropShadow dx="0" dy="22" stdDeviation="26" flood-color="#DF4360" flood-opacity="0.24"/>
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#4A1E2B" flood-opacity="0.08"/>
    </filter>
    <path id="kikyou-petal" d="M 0,-300 C 5.0,-295.1 18.55,-287.5 34.34,-280.8 C 69.0,-266.3 117.0,-227.9 108.65,-173.7 C 106.5,-166.2 105.2,-161.9 101.75,-155.7 L 23.37,-40.74 L 0,-25 L -23.37,-40.74 L -101.75,-155.7 C -105.2,-161.9 -106.5,-166.2 -108.65,-173.7 C -117.0,-227.9 -69.0,-266.3 -34.34,-280.8 C -18.55,-287.5 -5.0,-295.1 0,-300 Z" fill="#FFFDFB"/>
  </defs>

  <rect width="{WIDTH}" height="{HEIGHT}" fill="url(#chill-bg)"/>
  <rect width="{WIDTH}" height="{HEIGHT}" fill="url(#sun-orb)"/>
  <rect width="{WIDTH}" height="{HEIGHT}" fill="url(#blush-orb)"/>
  <rect width="{WIDTH}" height="{HEIGHT}" fill="url(#sky-orb)"/>
  <rect x="24" y="24" width="1152" height="582" rx="28" fill="none" stroke="rgba(255, 255, 255, 0.75)" stroke-width="1.5"/>

  <!-- Centered App Icon -->
  <g transform="translate(528, 104)" filter="url(#pillowy-shadow)">
    <rect width="144" height="144" rx="35" fill="url(#icon-grad)"/>
    <rect x="1" y="1" width="142" height="142" rx="34" fill="none" stroke="rgba(255,255,255,0.42)" stroke-width="2"/>
    <g transform="translate(72, 72) scale(0.185)">
      <use href="#kikyou-petal" transform="rotate(0)"/>
      <use href="#kikyou-petal" transform="rotate(72)"/>
      <use href="#kikyou-petal" transform="rotate(144)"/>
      <use href="#kikyou-petal" transform="rotate(216)"/>
      <use href="#kikyou-petal" transform="rotate(288)"/>
      <circle cx="0" cy="0" r="50" fill="#FFFDFB" stroke="#F45B74" stroke-width="7"/>
      <circle cx="0" cy="0" r="21" fill="#F45B74"/>
    </g>
  </g>

  <!-- Language Capsule -->
  <g transform="translate(600, 468)">
    <rect x="-240" y="0" width="480" height="46" rx="23" fill="rgba(255, 255, 255, 0.72)" stroke="rgba(255, 255, 255, 0.95)" stroke-width="1.5"/>
    <circle cx="-120" cy="23" r="2.5" fill="#D3D7E6"/>
    <circle cx="0" cy="23" r="2.5" fill="#D3D7E6"/>
    <circle cx="120" cy="23" r="2.5" fill="#D3D7E6"/>
  </g>
</svg>"""

    with open(temp_svg_path, "w", encoding="utf-8") as f:
        f.write(svg_bg)

    subprocess.run(["sips", "-s", "format", "png", temp_svg_path, "--out", temp_png_path], capture_output=True)

    img = Image.open(temp_png_path).convert("RGBA")
    draw = ImageDraw.Draw(img)

    # Clean Avenir / SF typography
    font_title_path = "/System/Library/Fonts/Avenir Next.ttc"
    font_sub_path = "/System/Library/Fonts/Avenir.ttc"
    if not os.path.exists(font_title_path):
        font_title_path = "/Library/Fonts/SF-Pro-Rounded-Bold.otf"
        font_sub_path = "/Library/Fonts/SF-Pro-Rounded-Medium.otf"

    f_title = ImageFont.truetype(font_title_path, 68)
    f_sub = ImageFont.truetype(font_sub_path, 25)
    f_desc = ImageFont.truetype(font_sub_path, 16)
    f_pill = ImageFont.truetype(font_sub_path, 15)
    f_foot = ImageFont.truetype(font_sub_path, 13)

    # Title "Voca"
    draw.text((600, 305), "Voca", fill=(36, 39, 56, 255), font=f_title, anchor="mm")
    # Subtitle
    draw.text((600, 362), "Learn languages while watching YouTube", fill=(88, 93, 119, 255), font=f_sub, anchor="mm")
    # Features
    draw.text((600, 404), "Interactive dual subtitles  ·  Instant dictionary  ·  Spaced repetition", fill=(136, 142, 170, 255), font=f_desc, anchor="mm")
    # Language pills
    draw.text((600 - 180, 468 + 23), "Japanese", fill=(61, 66, 89, 255), font=f_pill, anchor="mm")
    draw.text((600 - 60, 468 + 23), "Chinese", fill=(61, 66, 89, 255), font=f_pill, anchor="mm")
    draw.text((600 + 60, 468 + 23), "Korean", fill=(61, 66, 89, 255), font=f_pill, anchor="mm")
    draw.text((600 + 180, 468 + 23), "English", fill=(61, 66, 89, 255), font=f_pill, anchor="mm")
    # Domain
    draw.text((600, 562), "lingua-tube.pages.dev", fill=(168, 173, 191, 255), font=f_foot, anchor="mm")

    img.save(output_png_path)

    for p in [temp_svg_path, temp_png_path]:
        if os.path.exists(p):
            os.remove(p)

    print(f"Generated {output_png_path} ({WIDTH}x{HEIGHT})")

if __name__ == "__main__":
    main()
