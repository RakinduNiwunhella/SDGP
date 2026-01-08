import json
import pandas as pd
import numpy as np

# FILES
GEOJSON_FILE = "Kurunagala.geojson"
REFERENCE_CSV = "Dummy dataset.csv"
OUTPUT_CSV = "kurunegala_supabase_final.csv"

# Load reference agricultural data
ref_df = pd.read_csv(REFERENCE_CSV)

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
        for x in c:
            coords.add(tuple(x))
    elif t in ["Polygon", "MultiLineString"]:
        for p in c:
            for x in p:
                coords.add(tuple(x))
    elif t == "MultiPolygon":
        for poly in c:
            for p in poly:
                for x in p:
                    coords.add(tuple(x))

for feat in geo["features"]:
    extract_coords(feat["geometry"])

# Coordinates dataframe
coords_df = pd.DataFrame(coords, columns=["lng", "lat"])

# ~10m accuracy
coords_df["lng"] = coords_df["lng"].round(4)
coords_df["lat"] = coords_df["lat"].round(4)
coords_df = coords_df.drop_duplicates().reset_index(drop=True)

# 🔥 SAMPLE realistic agri data PER ROW
sampled_ref = ref_df.sample(
    n=len(coords_df),
    replace=True,
    random_state=42
).reset_index(drop=True)

# Combine coords + realistic values
final_df = pd.concat([coords_df, sampled_ref], axis=1)

# Remove rows with incomplete data
final_df = final_df.dropna().reset_index(drop=True)

# Save compressed
final_df.to_csv(
    OUTPUT_CSV.replace(".gz", ""),
    index=False
)

print("✅ DONE")
print("Rows:", len(final_df))