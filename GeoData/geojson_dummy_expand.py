import json
import pandas as pd

# FILES
GEOJSON_FILE = "Kurunagala.geojson"
DUMMY_XLSX  = "Dummy dataset.xlsx"
OUTPUT_CSV  = "kurunegala_supabase_final.csv"

# Load dummy dataset
dummy_df = pd.read_excel(DUMMY_XLSX)

# Load GeoJSON
with open(GEOJSON_FILE, "r", encoding="utf-8") as f:
    geo = json.load(f)

coords = set()

def extract_coords(geom):
    t = geom["type"]
    c = geom["coordinates"]

    if t == "Point":
        coords.add(tuple(c))
    elif t in ["MultiPoint", "LineString"]:
        for x in c: coords.add(tuple(x))
    elif t in ["Polygon", "MultiLineString"]:
        for p in c:
            for x in p: coords.add(tuple(x))
    elif t == "MultiPolygon":
        for poly in c:
            for p in poly:
                for x in p: coords.add(tuple(x))

for feat in geo["features"]:
    extract_coords(feat["geometry"])

# Expand dataset (OPTIMIZED – no iterrows)
rows = []

# Convert coords to DataFrame once
coords_df = pd.DataFrame(coords, columns=["lng", "lat"])

# Cross join dummy_df with coords_df
dummy_df["_key"] = 1
coords_df["_key"] = 1

final_df = dummy_df.merge(coords_df, on="_key").drop(columns="_key")

# Ensure column order
final_columns = list(dummy_df.columns.drop("_key")) + ["lng", "lat"]
final_df = final_df[final_columns]

# Save
final_df.to_csv(OUTPUT_CSV, index=False)

print("✅ DONE")
print("Coordinates:", len(coords))
print("Dummy rows:", len(dummy_df))
print("Final rows:", len(final_df))
