#!/usr/bin/env python3
"""Generate Voca's social card and browser icons from the approved fox art."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


PUBLIC = Path(__file__).resolve().parents[1] / "public"
SIZE = (1200, 630)
FONT_PATH = "/System/Library/Fonts/Avenir Next.ttc"


def font(size, bold=False):
    return ImageFont.truetype(FONT_PATH, size, index=0 if bold else 5)


def main():
    with Image.open(PUBLIC / "icons" / "brand-fox.png") as source:
        mark = source.convert("RGB")

    mark.resize((48, 48), Image.Resampling.LANCZOS).save(PUBLIC / "favicon.png")
    mark.save(
        PUBLIC / "favicon.ico",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )

    card = Image.new("RGB", SIZE, "#F4FAFE")
    draw = ImageDraw.Draw(card)
    draw.rounded_rectangle((28, 28, 1171, 601), radius=40, fill="#FCFEFF",
                           outline="#D9EAF5", width=2)

    draw.rectangle((747, 133, 1090, 476), fill="#DCEEF9")
    fox = mark.resize((344, 344), Image.Resampling.LANCZOS)
    card.paste(fox, (739, 125))

    draw.text((104, 104), "Voca", font=font(90, bold=True), fill="#112B43")
    draw.multiline_text(
        (106, 224), "Learn languages\nwith YouTube",
        font=font(57, bold=True), fill="#112B43", spacing=3,
    )
    draw.text((108, 390), "Interactive subtitles, dictionary, and review",
              font=font(25), fill="#425B72")
    draw.line((108, 484, 1088, 484), fill="#D9EAF5", width=2)
    draw.text((108, 522), "Japanese  /  Chinese  /  Korean  /  English  /  Vietnamese",
              font=font(23), fill="#425B72")
    draw.text((1088, 522), "voca.study", font=font(23, bold=True),
              fill="#275677", anchor="ra")

    card.save(PUBLIC / "og-image.png", optimize=True)


if __name__ == "__main__":
    main()
