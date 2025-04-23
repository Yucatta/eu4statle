from PIL import Image
import pandas as pd
import csv
import math

PROVINCE_ID = 4779  
PROVINCES_BMP_PATH = "provinces.bmp"
DEFINITION_CSV_PATH = "definition.csv"
OUTPUT_IMAGE_PATH = f"province_{PROVINCE_ID}.png"
emptylands_path = "emptylands.csv"

TARGET_WIDTH, TARGET_HEIGHT = 800 , 600
emptylands = []
land_rgbs = {
    "id":[],
    "red":[],
    "green":[],
    "blue":[],
}
import re
def get_all_empty_lands(csvloc):
    # with open(csvloc, encoding="windows-1254", errors="replace") as f:
    #     csv = pd.read_csv(f, delimiter=';')
    csv = pd.read_csv(f"{csvloc}")
    for i in range(len(csv)):
        emptylands.append(csv.iloc[i,0])
        # print(csv.iloc[i,0])
get_all_empty_lands(emptylands_path)
def extract_area_data(filename):
    state_names = []
    province_id_lists = []

    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    in_block = False
    brace_depth = 0
    current_area = None
    buffer = []

    for line in lines:
        line = line.strip()

        # Match any area name followed by '=' and '{'
        m = re.match(r'^([a-zA-Z0-9_]+)\s*=\s*\{', line)
        if m and not in_block:
            current_area = m.group(1)
            state_names.append(current_area)
            in_block = True
            brace_depth = 1
            buffer = []
            continue

        if in_block:
            brace_depth += line.count('{')
            brace_depth -= line.count('}')
            buffer.append(line)

            if brace_depth == 0:
                # Extract all integers across the buffered lines
                all_lines = '\n'.join(buffer)
                numbers = re.findall(r'\b\d+\b', all_lines)
                province_id_lists.append([int(n) for n in numbers])
                in_block = False

    return state_names, province_id_lists

states, ids = extract_area_data("states.txt")
print(states[184])
def get_all_rgb(csvloc,emptylands):
    with open(csvloc, encoding="windows-1254", errors="replace") as f:
        csv = pd.read_csv(f, delimiter=';')
    for i in range(len(csv)):
        currentprovinceid = csv.iloc[i,0]
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
        # for i in range(len(states)):
    # for i in range(len(regions)):
    # for i in range(1):
    #     region_provinces = []  

    #     for area in areas[i]:
    #         for j in range(len(states)):
    #             if states[j] == area:
    #                 region_provinces.extend(ids[j])
    #                 break
    print(width,height)
    for i in range(len(regions)):
    # for i in range(57,60):
        if(i == 58):
            mask = Image.new("RGBA", (width, height), (0, 0, 0, 0)) 
            for regionid in regionids[i]:
                    # print()
                    rgb_color = (land_rgbs["red"][regionid-1], land_rgbs["green"][regionid-1], land_rgbs["blue"][regionid-1])
                    # print(rgb_color,id)
                    land_pixels_for_province = land_pixel_data.get(rgb_color, [])
                    # print(land_pixels_for_province)
                    if not land_pixels_for_province:
                        print(f"Warning: No land pixels found for color {rgb_color}. Skipping this province.")
                        continue

                    graytone = 255 - math.floor((0.299 * rgb_color[0] + 0.587 * rgb_color[1] + 0.114 * rgb_color[2])/2)
                    for j in land_pixels_for_province:
                        anotherone = (j[0]-2000,j[1])
                        mask.putpixel(anotherone, (graytone, graytone, graytone, 255))
            mask.size
            bbox = mask.getbbox()
            cropped = mask.crop(bbox)
            notwidth,notheight = cropped.size
            widths.append(notwidth)
            heights.append(notheight)
            for area in areas[i]:
                for j in range(len(states)):
                    if states[j] == area:
                        thatsdumb = []
                        for id in ids[j]:
                            # print()
                            thatsdumb.append(id)
                            rgb_color = (land_rgbs["red"][id-1], land_rgbs["green"][id-1], land_rgbs["blue"][id-1])
                            # print(rgb_color,id)
                            land_pixels_for_province = land_pixel_data.get(rgb_color, [])
                            # print(land_pixels_for_province)
                            if not land_pixels_for_province:
                                print(f"Warning: No land pixels found for color {rgb_color}. Skipping this province.")
                                continue
                            
                            # graytone = math.floor(0.299 * rgb_color[0] + 0.587 * rgb_color[1] + 0.114 * rgb_color[2])
                            lightness = (0.2126 * land_rgbs["red"][id-1] + 0.7152 * land_rgbs["green"][id-1] + 0.0722 * land_rgbs["blue"][id-1])/255
                            for k in land_pixels_for_province:
                                another = (k[0]-2000,k[1])
                                mask.putpixel(another, (math.floor(140*lightness),math.floor(140*lightness),255, 255))
                    
                        bbox = mask.getbbox()
                        cropped = mask.crop(bbox)
                        notwidth,notheight = cropped.size
                        widths.append(notwidth)
                        heights.append(notheight)
                        # Resize and center
                        cropped.thumbnail((TARGET_WIDTH, TARGET_HEIGHT), Image.LANCZOS)
                        centered = Image.new("RGBA", (TARGET_WIDTH, TARGET_HEIGHT), (0, 0, 0, 0))
                        paste_x = (TARGET_WIDTH - cropped.width) // 2
                        paste_y = (TARGET_HEIGHT - cropped.height) // 2
                        centered.paste(cropped, (paste_x, paste_y))
                        # cropped = mask.crop(bbox)
                        centered.save(f"states/{j}.png")
                        print(f"Saved states/{j}.png",notwidth,notheight,area,regions[i])
                        # print(ids)
                        for id in thatsdumb:
                            # print()
                            rgb_color = (land_rgbs["red"][id-1], land_rgbs["green"][id-1], land_rgbs["blue"][id-1])
                            # print(rgb_color,id)
                            land_pixels_for_province = land_pixel_data.get(rgb_color, [])
                            # print(land_pixels_for_province)
                            if not land_pixels_for_province:
                                print(f"Warning: No land pixels found for color {rgb_color}. Skipping this province.")
                                continue

                            graytone = math.floor(0.299 * rgb_color[0] + 0.587 * rgb_color[1] + 0.114 * rgb_color[2])
                            for k in land_pixels_for_province:
                                anotheroneone = (k[0]-2000,k[1])
                                mask.putpixel(anotheroneone, (graytone, graytone, graytone, 255))
                        break
        else:
            mask = Image.new("RGBA", (width, height), (0, 0, 0, 0)) 
            for regionid in regionids[i]:
                    # print()
                    rgb_color = (land_rgbs["red"][regionid-1], land_rgbs["green"][regionid-1], land_rgbs["blue"][regionid-1])
                    # print(rgb_color,id)
                    land_pixels_for_province = land_pixel_data.get(rgb_color, [])
                    # print(land_pixels_for_province)
                    if not land_pixels_for_province:
                        print(f"Warning: No land pixels found for color {rgb_color}. Skipping this province.")
                        continue

                    graytone = math.floor(0.299 * rgb_color[0] + 0.587 * rgb_color[1] + 0.114 * rgb_color[2])
                    for j in land_pixels_for_province:
                        mask.putpixel(j, (graytone, graytone, graytone, 255))
            mask.size
            bbox = mask.getbbox()
            cropped = mask.crop(bbox)
            notwidth,notheight = cropped.size
            widths.append(notwidth)
            heights.append(notheight)
            for area in areas[i]:
                for j in range(len(states)):
                    if states[j] == area:
                        thatsdumb = []
                        for id in ids[j]:
                            # print()
                            thatsdumb.append(id)
                            rgb_color = (land_rgbs["red"][id-1], land_rgbs["green"][id-1], land_rgbs["blue"][id-1])
                            # print(rgb_color,id)
                            land_pixels_for_province = land_pixel_data.get(rgb_color, [])
                            # print(land_pixels_for_province)
                            if not land_pixels_for_province:
                                print(f"Warning: No land pixels found for color {rgb_color}. Skipping this province.")
                                continue
                            
                            # graytone = math.floor(0.299 * rgb_color[0] + 0.587 * rgb_color[1] + 0.114 * rgb_color[2])
                            lightness = (0.2126 * land_rgbs["red"][id-1] + 0.7152 * land_rgbs["green"][id-1] + 0.0722 * land_rgbs["blue"][id-1])/255
                            for k in land_pixels_for_province:
                                mask.putpixel(k, (math.floor(140*lightness),math.floor(140*lightness),255, 255))
                    
                        bbox = mask.getbbox()
                        cropped = mask.crop(bbox)
                        notwidth,notheight = cropped.size
                        widths.append(notwidth)
                        heights.append(notheight)
                        # Resize and center
                        cropped.thumbnail((TARGET_WIDTH, TARGET_HEIGHT), Image.LANCZOS)
                        centered = Image.new("RGBA", (TARGET_WIDTH, TARGET_HEIGHT), (0, 0, 0, 0))
                        paste_x = (TARGET_WIDTH - cropped.width) // 2
                        paste_y = (TARGET_HEIGHT - cropped.height) // 2
                        centered.paste(cropped, (paste_x, paste_y))
                        # cropped = mask.crop(bbox)
                        centered.save(f"states/{j}.png")
                        print(f"Saved states/{j}.png",notwidth,notheight,area,regions[i])
                        # print(ids)
                        for id in thatsdumb:
                            # print()
                            rgb_color = (land_rgbs["red"][id-1], land_rgbs["green"][id-1], land_rgbs["blue"][id-1])
                            # print(rgb_color,id)
                            land_pixels_for_province = land_pixel_data.get(rgb_color, [])
                            # print(land_pixels_for_province)
                            if not land_pixels_for_province:
                                print(f"Warning: No land pixels found for color {rgb_color}. Skipping this province.")
                                continue

                            graytone = math.floor(0.299 * rgb_color[0] + 0.587 * rgb_color[1] + 0.114 * rgb_color[2])
                            for k in land_pixels_for_province:
                                mask.putpixel(k, (graytone, graytone, graytone, 255))
                        break
        
        # mask = Image.new("RGBA", (width, height), (0, 0, 0, 0)) 
        # for regionid in regionids[i]:
        #          # print()
        #         rgb_color = (land_rgbs["red"][regionid-1], land_rgbs["green"][regionid-1], land_rgbs["blue"][regionid-1])
        #         # print(rgb_color,id)
        #         land_pixels_for_province = land_pixel_data.get(rgb_color, [])
        #         # print(land_pixels_for_province)
        #         if not land_pixels_for_province:
        #             print(f"Warning: No land pixels found for color {rgb_color}. Skipping this province.")
        #             continue

        #         graytone = math.floor(0.299 * rgb_color[0] + 0.587 * rgb_color[1] + 0.114 * rgb_color[2])
        #         for j in land_pixels_for_province:
        #             mask.putpixel(j, (graytone, graytone, graytone, 255))
        # mask.size
        # bbox = mask.getbbox()
        # cropped = mask.crop(bbox)
        # notwidth,notheight = cropped.size
        # widths.append(notwidth)
        # heights.append(notheight)
        # for area in areas[i]:
        #     for j in range(len(states)):
        #         if states[j] == area:
        #             thatsdumb = []
        #             for id in ids[j]:
        #                  # print()
        #                 thatsdumb.append(id)
        #                 rgb_color = (land_rgbs["red"][id-1], land_rgbs["green"][id-1], land_rgbs["blue"][id-1])
        #                 # print(rgb_color,id)
        #                 land_pixels_for_province = land_pixel_data.get(rgb_color, [])
        #                 # print(land_pixels_for_province)
        #                 if not land_pixels_for_province:
        #                     print(f"Warning: No land pixels found for color {rgb_color}. Skipping this province.")
        #                     continue
                        
        #                 # graytone = math.floor(0.299 * rgb_color[0] + 0.587 * rgb_color[1] + 0.114 * rgb_color[2])
        #                 lightness = (0.2126 * land_rgbs["red"][id-1] + 0.7152 * land_rgbs["green"][id-1] + 0.0722 * land_rgbs["blue"][id-1])/255
        #                 for k in land_pixels_for_province:
        #                     mask.putpixel(k, (math.floor(140*lightness),math.floor(140*lightness),255, 255))
                   
        #             bbox = mask.getbbox()
        #             cropped = mask.crop(bbox)
        #             notwidth,notheight = cropped.size
        #             widths.append(notwidth)
        #             heights.append(notheight)
        #             # Resize and center
        #             cropped.thumbnail((TARGET_WIDTH, TARGET_HEIGHT), Image.LANCZOS)
        #             centered = Image.new("RGBA", (TARGET_WIDTH, TARGET_HEIGHT), (0, 0, 0, 0))
        #             paste_x = (TARGET_WIDTH - cropped.width) // 2
        #             paste_y = (TARGET_HEIGHT - cropped.height) // 2
        #             centered.paste(cropped, (paste_x, paste_y))
        #             # cropped = mask.crop(bbox)
        #             centered.save(f"states/{j}.png")
        #             print(f"Saved states/{j}.png")
        #             # print(ids)
        #             for id in thatsdumb:
        #                  # print()
        #                 rgb_color = (land_rgbs["red"][id-1], land_rgbs["green"][id-1], land_rgbs["blue"][id-1])
        #                 # print(rgb_color,id)
        #                 land_pixels_for_province = land_pixel_data.get(rgb_color, [])
        #                 # print(land_pixels_for_province)
        #                 if not land_pixels_for_province:
        #                     print(f"Warning: No land pixels found for color {rgb_color}. Skipping this province.")
        #                     continue

        #                 graytone = math.floor(0.299 * rgb_color[0] + 0.587 * rgb_color[1] + 0.114 * rgb_color[2])
        #                 for k in land_pixels_for_province:
        #                     mask.putpixel(k, (graytone, graytone, graytone, 255))
        #             break
        
        # for j in range(len(states)):  # For each state
        #     # graytone = 
        #     for id in ids[j]:  # Each province in that state
        #         # print()
        #         rgb_color = (land_rgbs["red"][id-1], land_rgbs["green"][id-1], land_rgbs["blue"][id-1])
        #         # print(rgb_color,id)
        #         land_pixels_for_province = land_pixel_data.get(rgb_color, [])
        #         # print(land_pixels_for_province)
        #         if not land_pixels_for_province:
        #             print(f"Warning: No land pixels found for color {rgb_color}. Skipping this province.")
        #             continue

        #         graytone = math.floor(0.299 * rgb_color[0] + 0.587 * rgb_color[1] + 0.114 * rgb_color[2])
        #         for j in land_pixels_for_province:
        #             mask.putpixel(j, (graytone, graytone, graytone, 255))  # keep original positions for now

        #     # Once all provinces in the state are placed, then crop the total mask
        #     bbox = mask.getbbox()
        #     cropped = mask.crop(bbox)

        #     # Resize and center
        #     cropped.thumbnail((TARGET_WIDTH, TARGET_HEIGHT), Image.LANCZOS)
        #     centered = Image.new("RGBA", (TARGET_WIDTH, TARGET_HEIGHT), (0, 0, 0, 0))
        #     paste_x = (TARGET_WIDTH - cropped.width) // 2
        #     paste_y = (TARGET_HEIGHT - cropped.height) // 2
        #     centered.paste(cropped, (paste_x, paste_y))
        #     # cropped = mask.crop(bbox)
        #     centered.save(f"states/{j}.png")
        #     print(f"Saved states/{j}.png")

# Run the functions



def extract_regions_and_areas(file_path):
    regions = []
    areas = []

    current_region = None
    current_area_list = []
    block_stack = []

    with open(file_path, "r", encoding="utf-8") as file:
        for line in file:
            line = line.strip()

            if not line or line.startswith("#"):
                continue  # skip empty or comment lines

            if line.endswith("= {"):
                key = line.split("=")[0].strip()

                if current_region is None:
                    current_region = key
                    regions.append(current_region)
                    current_area_list = []

                block_stack.append(key)

            elif line == "}":
                if block_stack:
                    popped = block_stack.pop()
                    if popped == "areas":
                        areas.append(current_area_list)
                    elif popped == current_region and not block_stack:
                        current_region = None

            elif block_stack and block_stack[-1] == "areas":
                current_area_list.append(line)

    return regions, areas
regionids = []
regions, areas = extract_regions_and_areas("region.txt")

def foundidsforregion():
    for i in range(len(regions)):
        region_provinces = []  

        for area in areas[i]:
            for j in range(len(states)):
                if states[j] == area:
                    # print(area,states[j])
                    region_provinces.extend(ids[j])
                    break  

        regionids.append(region_provinces)
foundidsforregion()
# print(regionids)
for i in range(len(regions)):             
        for area in areas[i]:
            foundone = False
            # print(area)
            for j in range(len(states)):
                if states[j] == area:
                    foundone = True
                    # print(states[j],area)
            if(not foundone):
                print(area)

widths = []
heights = []
land_pixel_data = extract_land_pixels()
print("Found all land pixels.")
extract_and_resize()
maxwidth = max(widths)
maxheight = max(heights)
print(maxwidth,maxheight,widths.index(maxwidth),heights.index(maxheight))
# def findlenofareas():
#     a = 0
#     for area in areas:
#         # print(area)
#         a+= len(area) 
#         # print(area)
#     print(a)
# findlenofareas()
# print(areas)
# print(states)
# print(len(areas))
# print(states[323])


