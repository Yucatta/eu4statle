import re
import pprint # For pretty printing the output

# --- !! Enable/Disable Debugging !! ---
ENABLE_DEBUG_PRINTING = True
# --- !! Enable/Disable Debugging !! ---

def debug_print(*args, **kwargs):
    """Prints messages only if debugging is enabled."""
    if ENABLE_DEBUG_PRINTING:
        print("DEBUG:", *args, **kwargs)

def parse_game_data(region_filepath="region.txt", states_filepath="states.txt"):
    """
    Parses region and state definition files to extract regions, their areas,
    and the province IDs associated with each area.

    Args:
        region_filepath (str): The path to the region definition file.
        states_filepath (str): The path to the state/area definition file.

    Returns:
        tuple: A tuple containing three lists:
            - regions (list): A list of region names (str).
            - region_areas (list): A list of lists, where each inner list
              contains area names (str) for the corresponding region.
            - region_area_ids (list): A list of lists of lists, where each
              innermost list contains province IDs (int) for the
              corresponding area within a region.
    """
    area_province_map = {}
    regions = []
    region_areas = []
    region_area_ids = []
    not_found_areas = set() # Keep track of areas mentioned in regions but not defined in states

    # --- Step 1: Parse states.txt to map areas to province IDs ---
    debug_print(f"--- Parsing {states_filepath} ---")
    try:
        with open(states_filepath, 'r', encoding='utf-8') as f:
            states_content_raw = f.read()
            # Remove comments starting with #
            states_content_no_comments = re.sub(r'#.*', '', states_content_raw)
            # Remove empty lines that might result from comment removal
            states_content_cleaned = "\n".join(line for line in states_content_no_comments.splitlines() if line.strip())

    except FileNotFoundError:
        print(f"Error: File not found at {states_filepath}")
        return [], [], []
    except Exception as e:
        print(f"Error reading {states_filepath}: {e}")
        return [], [], []

    # Regex to find area blocks (e.g., brittany_area = { ... })
    area_block_regex = re.compile(r"^\s*(\w+)\s*=\s*{([\s\S]*?)}", re.MULTILINE)
    # Regex to find numbers (province IDs) within a block
    province_id_regex = re.compile(r'\b(\d+)\b')
    # Regex to find color blocks to ignore IDs within them
    color_block_regex = re.compile(r"color\s*=\s*{[^}]*}", re.IGNORECASE | re.MULTILINE)

    debug_print("Looking for area blocks in states.txt...")
    area_blocks_found = 0
    for match in area_block_regex.finditer(states_content_cleaned):
        area_name = match.group(1).strip()
        block_content = match.group(2)
        area_blocks_found += 1

        # Remove color block content before searching for IDs
        block_content_no_color = color_block_regex.sub('', block_content)

        # Find all province IDs within the cleaned block content
        province_ids = [int(pid) for pid in province_id_regex.findall(block_content_no_color)]

        if province_ids:
            debug_print(f"  Found area '{area_name}' with IDs: {province_ids}")
            area_province_map[area_name] = province_ids
        else:
            # It might be an empty block or something else like 'Deprecated'
             debug_print(f"  Found block '{area_name}' but no valid province IDs extracted. Skipping.")

    debug_print(f"Finished parsing states.txt. Found {area_blocks_found} potential blocks, created {len(area_province_map)} area->ID mappings.")
    if not area_province_map:
         debug_print("WARNING: The area_province_map is empty. Check states.txt format and regex.")


    # --- Step 2: Parse region.txt to get regions and their associated areas ---
    debug_print(f"\n--- Parsing {region_filepath} ---")
    try:
        with open(region_filepath, 'r', encoding='utf-8') as f:
            region_content_raw = f.read()
            # Remove comments starting with #
            region_content_no_comments = re.sub(r'#.*', '', region_content_raw)
             # Remove empty lines
            region_content_cleaned = "\n".join(line for line in region_content_no_comments.splitlines() if line.strip())

    except FileNotFoundError:
        print(f"Error: File not found at {region_filepath}")
        return [], [], []
    except Exception as e:
        print(f"Error reading {region_filepath}: {e}")
        return [], [], []

    # Regex to find region blocks (e.g., france_region = { ... })
    region_block_regex = re.compile(r"^\s*(\w+_region)\s*=\s*{([\s\S]*?)}", re.MULTILINE)
    # Regex to find the 'areas = { ... }' block within a region block
    areas_content_regex = re.compile(r"areas\s*=\s*{([^}]*)}", re.IGNORECASE | re.MULTILINE)
    # Regex specifically for area names (word characters) - used after splitting lines
    area_name_validation_regex = re.compile(r'^\w+$')

    debug_print("Looking for region blocks in region.txt...")
    regions_found = 0
    for region_match in region_block_regex.finditer(region_content_cleaned):
        region_name = region_match.group(1).strip()
        region_block_content = region_match.group(2)
        regions_found += 1
        debug_print(f"\nProcessing Region: '{region_name}'")

        regions.append(region_name)

        areas_match = areas_content_regex.search(region_block_content)
        current_region_areas = []
        current_region_ids = []

        if areas_match:
            areas_block_content = areas_match.group(1)
            debug_print(f"  Found 'areas' block content:\n---\n{areas_block_content.strip()}\n---")
            # Split the content by lines
            lines = areas_block_content.splitlines()

            for line in lines:
                # Strip whitespace from each line to get potential area name
                potential_area_name = line.strip()
                debug_print(f"    Checking line: '{line.strip()}' -> Potential name: '{potential_area_name}'")

                # Check if it's a non-empty string and looks like a valid identifier
                if potential_area_name and area_name_validation_regex.match(potential_area_name):
                    area_name = potential_area_name
                    debug_print(f"      '{area_name}' looks like a valid area name.")
                    current_region_areas.append(area_name)
                    # Look up province IDs using the map created from states.txt
                    province_ids = area_province_map.get(area_name)
                    if province_ids is not None:
                        debug_print(f"        Found match in map! IDs: {province_ids}")
                        current_region_ids.append(province_ids)
                    else:
                        debug_print(f"        WARNING: Area '{area_name}' not found in area_province_map.")
                        current_region_ids.append([]) # Append empty list for this area
                        not_found_areas.add(area_name)
                elif potential_area_name:
                     debug_print(f"      '{potential_area_name}' skipped (doesn't match validation regex or is empty).")

        else:
             debug_print(f"  No 'areas = {{...}}' block found within region '{region_name}'.")

        region_areas.append(current_region_areas)
        region_area_ids.append(current_region_ids)

    debug_print(f"\nFinished parsing region.txt. Processed {regions_found} region blocks.")

    if not_found_areas:
        print("\nWarning: The following areas were mentioned in regions but not defined (or had no IDs) in states.txt:")
        for area in sorted(list(not_found_areas)):
            print(f"- {area}")

    return regions, region_areas, region_area_ids

# --- Step 3: Execute the parsing and print results ---
regions, region_areas, region_area_ids = parse_game_data()

# --- Turn off debugging before final print ---
ENABLE_DEBUG_PRINTING = False
# --- Turn off debugging before final print ---


# # Print the final results (using pprint for better readability of nested lists)
# print("\n" + "="*20 + " FINAL OUTPUT " + "="*20)

# print("\n--- Regions ---")
# pprint.pprint(regions)

# print("\n--- Areas per Region ---")
# pprint.pprint(region_areas)

# print("\n--- Province IDs per Area per Region ---")
# pprint.pprint(region_area_ids)

# # Example: Accessing data for the first region
# if regions:
#     print(f"\nExample: Data for the first region ({regions[0]}):")
#     if region_areas and len(region_areas) > 0 and region_areas[0]: # Check if the list and its first element exist
#         print(f"  Areas: {region_areas[0]}")
#         if region_area_ids and len(region_area_ids) > 0 and region_area_ids[0] and len(region_area_ids[0]) > 0 and region_area_ids[0][0]: # Check nested lists exist and have content
#             print(f"  Province IDs for first area ({region_areas[0][0]}): {region_area_ids[0][0]}")
#         elif region_area_ids and len(region_area_ids) > 0 and region_area_ids[0] and len(region_area_ids[0]) > 0:
#              print(f"  No province IDs found for the first area ({region_areas[0][0]}) in states.txt.")
#         else:
#              print("  Area list structure seems incorrect or IDs are missing.")

#     else:
#         print("  No areas found for this region.")
# else:
#     print("\nNo regions were parsed.")
