#!/usr/bin/env python3
"""
Generate a 1200x630 Open Graph preview image for Voca
"""
import os
from PIL import Image, ImageDraw, ImageFont

WIDTH = 1200
HEIGHT = 630

# Create high-res RGB canvas
img = Image.new('RGB', (WIDTH, HEIGHT), color='#0b0f19')
draw = ImageDraw.Draw(img)

# Draw subtle background gradient / cards
for y in range(HEIGHT):
    # Gradient from #0b0f19 (11, 15, 25) to #1e2238 (30, 34, 56)
    ratio = y / HEIGHT
    r = int(11 + (22 - 11) * ratio)
    g = int(15 + (30 - 15) * ratio)
    b = int(25 + (45 - 25) * ratio)
    draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))

# Outer decorative subtle border
draw.rounded_rectangle([30, 30, WIDTH - 30, HEIGHT - 30], radius=24, outline=(51, 65, 85), width=2)

# Glow effect behind logo
for radius in range(120, 70, -5):
    alpha = int((120 - radius) * 1.5)
    # Draw soft radial coral tint
    draw.ellipse([80 - (radius - 70), 90 - (radius - 70), 220 + (radius - 70), 230 + (radius - 70)],
                 outline=(199, 62, 58))

# Logo rounded square
logo_box = [100, 100, 210, 210]
draw.rounded_rectangle(logo_box, radius=28, fill=(199, 62, 58))

# Logo interior accent
draw.rounded_rectangle([104, 104, 206, 206], radius=24, outline=(255, 107, 107), width=2)

# Load fonts - try standard system sans-serif fonts
font_title = None
font_sub = None
font_pills = None
font_small = None
font_logo = None

font_paths = [
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/System/Library/Fonts/SFNS.ttf",
    "/Library/Fonts/Arial.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/System/Library/Fonts/Supplemental/Arial.ttf"
]

for p in font_paths:
    if os.path.exists(p):
        try:
            font_title = ImageFont.truetype(p, 64)
            font_sub = ImageFont.truetype(p, 28)
            font_pills = ImageFont.truetype(p, 20)
            font_small = ImageFont.truetype(p, 18)
            font_logo = ImageFont.truetype(p, 72)
            break
        except Exception:
            continue

if not font_title:
    font_title = ImageFont.load_default()
    font_sub = ImageFont.load_default()
    font_pills = ImageFont.load_default()
    font_small = ImageFont.load_default()
    font_logo = ImageFont.load_default()

# Draw logo text (Speech / Character "言" or "V")
draw.text((155, 155), "言", fill=(255, 255, 255), font=font_logo, anchor="mm")

# App Brand Title
draw.text((245, 125), "Voca", fill=(255, 255, 255), font=font_title)
draw.text((245, 195), "Learn Languages with Authentic YouTube Videos", fill=(148, 163, 184), font=font_sub)

# Subtitle preview card mockup in center
card_x1, card_y1, card_x2, card_y2 = 100, 260, WIDTH - 100, 480
draw.rounded_rectangle([card_x1, card_y1, card_x2, card_y2], radius=20, fill=(15, 23, 42), outline=(51, 65, 85), width=2)

# YouTube style red bar at top of card
draw.rounded_rectangle([card_x1 + 24, card_y1 + 24, card_x1 + 36, card_y1 + 44], radius=3, fill=(239, 68, 68))
draw.text((card_x1 + 48, card_y1 + 26), "INTERACTIVE DUAL SUBTITLES & REAL-TIME TOKENIZER", fill=(203, 213, 225), font=font_small)

# Japanese subtitle sample with Furigana
draw.text((card_x1 + 48, card_y1 + 80), "日本語を勉強するのがとても楽しいです！", fill=(248, 250, 252), font=font_sub)
draw.text((card_x1 + 48, card_y1 + 125), "Studying Japanese is really fun!", fill=(148, 163, 184), font=font_small)
draw.text((card_x1 + 48, card_y1 + 155), "Học tiếng Nhật thật là thú vị!  •  学日语非常有趣！", fill=(100, 116, 139), font=font_small)

# Feature Badges Pill Row
pills = [
    "Dual Subtitles",
    "Furigana & Pinyin",
    "Instant Dictionary",
    "SM-2 Flashcards",
    "AI Transcription"
]

pill_x = 100
pill_y = 515
for pill in pills:
    bbox = draw.textbbox((0, 0), pill, font=font_pills)
    pw = bbox[2] - bbox[0] + 32
    ph = 40
    draw.rounded_rectangle([pill_x, pill_y, pill_x + pw, pill_y + ph], radius=12, fill=(30, 41, 59), outline=(71, 85, 105), width=1)
    draw.text((pill_x + 16, pill_y + 10), pill, fill=(226, 232, 240), font=font_pills)
    pill_x += pw + 16

# Footer URL & languages
draw.text((100, 580), "JA  •  ZH  •  KO  •  EN", fill=(99, 102, 241), font=font_small)
draw.text((WIDTH - 100, 580), "https://lingua-tube.pages.dev", fill=(148, 163, 184), font=font_small, anchor="ra")

output_path = os.path.join(os.path.dirname(__file__), "..", "public", "og-image.png")
img.save(output_path, "PNG", optimize=True)
print(f"Generated {output_path} ({WIDTH}x{HEIGHT})")
