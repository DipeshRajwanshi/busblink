import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";

// Custom bus icon
const busIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2302/2302789.png",
  iconSize: [40, 40],
});

// Helper to fix auto-resize
const ResizeHandler = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);
  return null;
};

const BusDetails = () => {
  const { id } = useParams();
  const [busData, setBusData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy bus data
  useEffect(() => {
    setLoading(true);

    const fakeBus = {
      id,
      name: "Bus 101",
      from: "Main Terminal",
      to: "University Gate",
      eta: "6 mins",
      location: { lat: 28.6139, lng: 77.209 },
      occupancy: "Moderate",
      type: "Electric AC",
    };

    setTimeout(() => {
      setBusData(fakeBus);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white text-lg animate-pulse">
        Loading bus details...
      </div>
    );

  if (!busData)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-red-400 text-lg">
        Bus not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-100 px-6 py-10 mt-14">
      {/* mt-14 pushes content below navbar */}
      <h2 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">
        🚌 {busData.name} Details
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Info Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:scale-[1.02] transition duration-300">
          <h3 className="text-2xl font-semibold mb-4 text-blue-300">
            Route Info
          </h3>
          <div className="space-y-3 text-base">
            <p>
              <span className="font-semibold text-blue-200">Route:</span>{" "}
              {busData.from} → {busData.to}
            </p>
            <p>
              <span className="font-semibold text-blue-200">ETA:</span>{" "}
              {busData.eta}
            </p>
            <p>
              <span className="font-semibold text-blue-200">Bus Type:</span>{" "}
              {busData.type}
            </p>
            <p>
              <span className="font-semibold text-blue-200">Occupancy:</span>{" "}
              <span
                className={`${
                  busData.occupancy === "High"
                    ? "text-red-400"
                    : busData.occupancy === "Moderate"
                    ? "text-yellow-400"
                    : "text-green-400"
                } font-medium`}
              >
                {busData.occupancy}
              </span>
            </p>
          </div>
        </div>

        {/* Map Section */}
        <div className="relative h-[350px] md:h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
          <MapContainer
            center={[busData.location.lat, busData.location.lng]}
            zoom={15}
            className="absolute top-0 left-0 w-full h-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[busData.location.lat, busData.location.lng]}
              icon={busIcon}
            >
              <Popup className="text-sm font-medium">
                {busData.name} - Current Location
              </Popup>
            </Marker>
            {/* Ensure map resizes properly */}
            <ResizeHandler />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default BusDetails;
