from PIL import Image
import pandas as pd
import csv

PROVINCE_ID = 4779  
PROVINCES_BMP_PATH = "provinces.bmp"
DEFINITION_CSV_PATH = "definition.csv"
OUTPUT_IMAGE_PATH = f"province_{PROVINCE_ID}.png"

TARGET_WIDTH, TARGET_HEIGHT = 400, 300
def get_all_rgbs(csvloc):
    with open(csvloc, encoding="windows-1254", errors="replace") as f:
        csv = pd.read_csv(f, delimiter=';')
    # print(csv.head())
    # print(csv.columns)
    sample_array = (csv.iloc[0:4][0:5])
    print(sample_array)
get_all_rgbs(DEFINITION_CSV_PATH)
def extract_and_resize(province_id, rgb_color):
    img = Image.open(PROVINCES_BMP_PATH).convert("RGB")
    width, height = img.size
    mask = Image.new("RGBA", (width, height), (0, 0, 0, 0))

    for x in range(width):
        for y in range(height):
            if img.getpixel((x, y)) == rgb_color:
                mask.putpixel((x, y), rgb_color + (255,))

    bbox = mask.getbbox() 
    if not bbox:
        raise ValueError("Province area not found.")
    cropped = mask.crop(bbox)

    cropped.thumbnail((TARGET_WIDTH, TARGET_HEIGHT), Image.LANCZOS)

    centered = Image.new("RGBA", (TARGET_WIDTH, TARGET_HEIGHT), (0, 0, 0, 0))
    paste_x = (TARGET_WIDTH - cropped.width) // 2
    paste_y = (TARGET_HEIGHT - cropped.height) // 2
    centered.paste(cropped, (paste_x, paste_y))

    centered.save(OUTPUT_IMAGE_PATH)
    print(f"Saved centered and resized image to {OUTPUT_IMAGE_PATH}")
rgb = (124,10,162)
# extract_and_resize(PROVINCE_ID, rgb)
