from PIL import Image
import pandas as pd
import csv
import math

PROVINCE_ID = 4779  
PROVINCES_BMP_PATH = "provinces.bmp"
DEFINITION_CSV_PATH = "definition.csv"
OUTPUT_IMAGE_PATH = f"province_{PROVINCE_ID}.png"
emptylands_path = "emptylands.csv"

TARGET_WIDTH, TARGET_HEIGHT = 400, 300
emptylands = []
land_rgbs = {
    "id":[],
    "red":[],
    "green":[],
    "blue":[],
}
def get_all_empty_lands(csvloc):
    # with open(csvloc, encoding="windows-1254", errors="replace") as f:
    #     csv = pd.read_csv(f, delimiter=';')
    csv = pd.read_csv(f"{csvloc}")
    for i in range(len(csv)):
        emptylands.append(csv.iloc[i,0])
        # print(csv.iloc[i,0])
get_all_empty_lands(emptylands_path)


def get_all_rgb(csvloc,emptylands):
    with open(csvloc, encoding="windows-1254", errors="replace") as f:
        csv = pd.read_csv(f, delimiter=';')
    for i in range(len(csv)):
        currentprovinceid = csv.iloc[i,0]
        if(currentprovinceid>1170 and currentprovinceid<2003):
            skip = False
            for j in range(0,574):
                currentwastelandid = emptylands[j]
                if(currentprovinceid ==currentwastelandid):
                    skip = True
                    break
            if(skip):
                continue
        if(currentprovinceid>2125 and currentprovinceid<2960):
            skip = False
            for j in range(572,586):
                currentwastelandid = emptylands[j]
                if(currentprovinceid ==currentwastelandid):
                    skip = True
                    break
            if(skip):
                continue
        if(currentprovinceid>4130 and currentprovinceid<4950):
            skip = False
            for j in range(584,len(emptylands)):
                currentwastelandid = emptylands[j]
                if(currentprovinceid ==currentwastelandid):
                    skip = True
                    break
            if(skip):
                continue
        land_rgbs["id"].append(currentprovinceid)
        land_rgbs["red"].append(csv.iloc[i,1])   
        land_rgbs["green"].append(csv.iloc[i,2])   
        land_rgbs["blue"].append(csv.iloc[i,3])   

get_all_rgb(DEFINITION_CSV_PATH,emptylands)
print(len(emptylands))
print(len(land_rgbs["id"]),len(land_rgbs["red"]),len(land_rgbs["green"]),len(land_rgbs["blue"]))


def extract_land_pixels():
    PROVINCES_BMP_PATH = "provinces.bmp"
    land_colors = set(zip(land_rgbs["red"], land_rgbs["green"], land_rgbs["blue"]))
    img = Image.open(PROVINCES_BMP_PATH).convert("RGB")
    width, height = img.size
    land_pixels = {color: [] for color in land_colors}
    def is_land_pixel(pixel):
        return pixel in land_colors
    for x in range(width):
        for y in range(height):
            pixel = img.getpixel((x, y))
            if is_land_pixel(pixel):
                land_pixels[pixel].append((x, y))

    return land_pixels

def extract_and_resize():
    img = Image.open(PROVINCES_BMP_PATH).convert("RGB")
    width, height = img.size
    for i in range(len(land_rgbs["id"])):
    # for i in range(0,10):
        rgb_color = (land_rgbs["red"][i], land_rgbs["green"][i], land_rgbs["blue"][i])
        land_id = land_rgbs["id"][i]
        land_pixels_for_province = land_pixel_data.get(rgb_color, [])
        
        print(f"Processing province {i} with color {rgb_color}...")

        # Check if land pixels exist for this province
        if not land_pixels_for_province:
            print(f"Warning: No land pixels found for color {rgb_color}. Skipping this province.")
            continue  # Skip if no land pixels are found

        mask = Image.new("RGBA", (width, height), (0, 0, 0, 0))  

        # Place land pixels on the mask
        graytone = math.floor(0.299 * rgb_color[0] + 0.587 * rgb_color[1] + 0.114 * rgb_color[2])
        for j in land_pixels_for_province:
            mask.putpixel(j, (graytone,graytone,graytone) + (255,))  # Adding full alpha (255)

        # Calculate the bounding box of the land area
        bbox = mask.getbbox() 
        if not bbox:
            print(f"Warning: No bounding box found for color {rgb_color}. Skipping this province.")
            continue  # Skip if no bounding box is found

        cropped = mask.crop(bbox)

        # Resize the cropped image
        cropped.thumbnail((TARGET_WIDTH, TARGET_HEIGHT), Image.LANCZOS)

        # Center the cropped image
        centered = Image.new("RGBA", (TARGET_WIDTH, TARGET_HEIGHT), (0, 0, 0, 0)) 
        paste_x = (TARGET_WIDTH - cropped.width) // 2
        paste_y = (TARGET_HEIGHT - cropped.height) // 2
        centered.paste(cropped, (paste_x, paste_y))

        # Save the image
        centered.save(f"provinces/province_{land_id}.png")
        print(f"Saved province_{land_id}.png")

# Run the functions
land_pixel_data = extract_land_pixels()
print("Found all land pixels.")
extract_and_resize()
