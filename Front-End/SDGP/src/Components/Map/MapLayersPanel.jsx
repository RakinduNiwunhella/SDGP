export default function MapLayersPanel({ layers, setLayers }) {
  const toggleLayer = (layer) => {
    setLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }));
  };

  return (
    <div className="w-72 bg-white rounded-xl shadow-sm p-4">
      <h2 className="font-semibold text-gray-800 mb-4">Map Layers</h2>

      {["ndvi", "evi", "vv", "vh"].map((layer) => (
        <div
          key={layer}
          className="flex items-center justify-between text-sm mb-2"
        >
          <span className="uppercase">{layer}</span>
          <input
            type="checkbox"
            checked={layers[layer]}
            onChange={() => toggleLayer(layer)}
          />
        </div>
      ))}
    </div>
  );
}
