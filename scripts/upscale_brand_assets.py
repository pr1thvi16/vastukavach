from pathlib import Path
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
PHOTO = ROOT / "public/images/founder.webp"
LOGO = ROOT / "public/images/kavach-logo.png"


def resize_photo() -> None:
    with Image.open(PHOTO) as source:
        image = source.convert("RGB")
        if image.size != (1080, 1080):
            image = image.resize((1080, 1080), Image.Resampling.LANCZOS)
            image = image.filter(ImageFilter.UnsharpMask(radius=1.0, percent=85, threshold=3))
        image.save(PHOTO, "WEBP", quality=96, method=6)


def resize_logo() -> None:
    with Image.open(LOGO) as source:
        image = source.convert("RGBA")
        target = (1400, 1210)
        if image.size != target:
            image = image.resize(target, Image.Resampling.LANCZOS)
            red, green, blue, alpha = image.split()
            rgb = Image.merge("RGB", (red, green, blue))
            rgb = rgb.filter(ImageFilter.UnsharpMask(radius=0.7, percent=70, threshold=2))
            red, green, blue = rgb.split()
            image = Image.merge("RGBA", (red, green, blue, alpha))
        image.save(LOGO, "PNG", optimize=True)


if __name__ == "__main__":
    resize_photo()
    resize_logo()
    with Image.open(PHOTO) as photo, Image.open(LOGO) as logo:
        print(f"Founder photo: {photo.size[0]}x{photo.size[1]} ({photo.format})")
        print(f"Kavach logo: {logo.size[0]}x{logo.size[1]} ({logo.format}, transparent={logo.mode == 'RGBA'})")
