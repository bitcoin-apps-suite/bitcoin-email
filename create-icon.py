#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageFont

def create_icon():
    # Create a 512x512 icon
    size = 512
    icon = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(icon)
    
    # Red circular background
    margin = 20
    draw.ellipse([margin, margin, size-margin, size-margin], 
                 fill=(239, 68, 68, 255))  # Red background
    
    # White skull emoji-style drawing
    center_x, center_y = size // 2, size // 2
    
    # Skull shape (simplified)
    skull_size = size - 100
    skull_x = (size - skull_size) // 2
    skull_y = (size - skull_size) // 2 - 20
    
    draw.ellipse([skull_x, skull_y, skull_x + skull_size, skull_y + skull_size], 
                 fill=(255, 255, 255, 255))
    
    # Eye sockets
    eye_size = 60
    left_eye_x = center_x - 80
    right_eye_x = center_x + 20
    eye_y = center_y - 40
    
    draw.ellipse([left_eye_x, eye_y, left_eye_x + eye_size, eye_y + eye_size], 
                 fill=(0, 0, 0, 255))
    draw.ellipse([right_eye_x, eye_y, right_eye_x + eye_size, eye_y + eye_size], 
                 fill=(0, 0, 0, 255))
    
    # Nasal cavity
    nose_points = [
        (center_x, center_y + 10),
        (center_x - 15, center_y + 50),
        (center_x + 15, center_y + 50)
    ]
    draw.polygon(nose_points, fill=(0, 0, 0, 255))
    
    # "3004" text at bottom
    try:
        font_size = 48
        # Try to use a system font
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    except:
        # Fallback to default font
        font = ImageFont.load_default()
    
    text = "3004"
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    text_x = (size - text_width) // 2
    text_y = size - 80
    
    # Black text with white outline
    for dx in [-2, -1, 0, 1, 2]:
        for dy in [-2, -1, 0, 1, 2]:
            if dx != 0 or dy != 0:
                draw.text((text_x + dx, text_y + dy), text, font=font, fill=(255, 255, 255, 255))
    draw.text((text_x, text_y), text, font=font, fill=(0, 0, 0, 255))
    
    return icon

# Create the icon
icon = create_icon()

# Save as different sizes for macOS app bundle
sizes = [16, 32, 64, 128, 256, 512]
iconset_path = "/Volumes/Extreme SSD/Projects/bitcoin-email/Kill Port 3004.app/Contents/Resources/AppIcon.iconset"
os.makedirs(iconset_path, exist_ok=True)

for size in sizes:
    resized = icon.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(f"{iconset_path}/icon_{size}x{size}.png")
    
    # Also create @2x versions
    if size <= 256:
        resized.save(f"{iconset_path}/icon_{size}x{size}@2x.png")

print("Icon created successfully!")
