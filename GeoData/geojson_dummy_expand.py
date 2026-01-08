import json
import pandas as pd

# FILES
GEOJSON_FILE = "Kurunagala.geojson"
DUMMY_XLSX  = "Dummy dataset.xlsx"
OUTPUT_CSV  = "kurunegala_supabase_final.csv.gz"

# Load dummy dataset
dummy_df = pd.read_excel(DUMMY_XLSX)

# Remove duplicate dummy rows (IMPORTANT)
dummy_df = dummy_df.drop_duplicates()

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

# Convert coords to DataFrame
coords_df = pd.DataFrame(coords, columns=["lng", "lat"])

# Reduce precision to ~10m accuracy
coords_df["lng"] = coords_df["lng"].round(4)
coords_df["lat"] = coords_df["lat"].round(4)

# Drop duplicates created by rounding
coords_df = coords_df.drop_duplicates()

# Cross join
dummy_df["_key"] = 1
coords_df["_key"] = 1

final_df = dummy_df.merge(coords_df, on="_key").drop(columns="_key")

# Column order
final_columns = list(dummy_df.columns.drop("_key")) + ["lng", "lat"]
final_df = final_df[final_columns]

# Save as COMPRESSED CSV
final_df.to_csv(
    OUTPUT_CSV,
    index=False,
    compression="gzip"
)

print("✅ DONE")
print("Coordinates after rounding:", len(coords_df))
print("Dummy rows:", len(dummy_df))
print("Final rows:", len(final_df))