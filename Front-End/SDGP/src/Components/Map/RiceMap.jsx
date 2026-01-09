import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import { latLngBounds } from "leaflet";
import { supabase } from "../../supabaseClient";

const SRI_LANKA_CENTER = [7.8731, 80.7718];
const SRI_LANKA_ZOOM = 7;

const HEALTH_MAP = {
  Healthy: "Normal",
  Stressed: "Mild Stress",
  Damaged: "Severe Stress",
};

function getHealthColor(health) {
  if (health === "Normal") return "#16a34a";
  if (health === "Mild Stress") return "#facc15";
  if (health === "Severe Stress") return "#dc2626";
  return "#2563eb";
}

export default function RiceMap({ filters }) {
  const [points, setPoints] = useState([]);
  const mapRef = useRef(null); // ✅ MUST be inside component

  const selectedDistrict = filters.districts[0];
  const selectedHealth = filters.health;

  /* ---------- EXPOSE MAP TO DEVTOOLS (TEMP) ---------- */
  useEffect(() => {
    if (mapRef.current) {
      window.map = mapRef.current;
    }
  }, []);

  /* ---------- FETCH ALL POINTS (PAGINATION) ---------- */
  useEffect(() => {
    if (!selectedDistrict) {
      setPoints([]);
      return;
    }

    const fetchAllPoints = async () => {
      const pageSize = 1000;
      let from = 0;
      let allData = [];

      while (true) {
        const { data, error } = await supabase
          .from("final_ml_predictions")
          .select("lat, lng, paddy_health")
          .eq("District", selectedDistrict)
          .range(from, from + pageSize - 1);

        if (error) {
          console.error(error);
          break;
        }

        if (!data || data.length === 0) break;

        allData = allData.concat(data);
        from += pageSize;
      }

      setPoints(allData);
    };

    fetchAllPoints();
  }, [selectedDistrict]);

  /* ---------- HEALTH FILTER ---------- */
  let visiblePoints = points;

  if (selectedHealth.length > 0) {
    const dbHealthValues = selectedHealth.map(
      (ui) => HEALTH_MAP[ui]
    );

    visiblePoints = points.filter((p) =>
      dbHealthValues.includes(p.paddy_health)
    );
  }

  /* ---------- AUTO ZOOM ---------- */
  const bounds =
    visiblePoints.length > 0
      ? latLngBounds(visiblePoints.map((p) => [p.lat, p.lng]))
      : null;

  return (
    <MapContainer
      ref={mapRef}
      center={SRI_LANKA_CENTER}
      zoom={SRI_LANKA_ZOOM}
      bounds={bounds}
      className="h-full w-full rounded-xl"
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {visiblePoints.map((p, idx) => (
        <CircleMarker
          key={idx}
          center={[p.lat, p.lng]}
          radius={4}
          pathOptions={{
            color:
              selectedHealth.length === 0
                ? "#2563eb"
                : getHealthColor(p.paddy_health),
            fillColor:
              selectedHealth.length === 0
                ? "#2563eb"
                : getHealthColor(p.paddy_health),
            fillOpacity: 0.75,
            weight: 1,
          }}
        />
      ))}
    </MapContainer>
  );
}
