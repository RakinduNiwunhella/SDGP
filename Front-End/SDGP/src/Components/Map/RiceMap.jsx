import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";

export default function RiceMap() {
  const [aoi, setAoi] = useState(null);

  useEffect(() => {
    fetch("/aoi.geojson")
      .then((res) => res.json())
      .then((data) => setAoi(data))
      .catch((err) => console.error("GeoJSON load error", err));
  }, []);

  return (
    <MapContainer
      center={[7.872, 80.67]}
      zoom={13}
      className="h-full w-full rounded-xl"
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {aoi && <GeoJSON data={aoi} />}
    </MapContainer>
  );
}
