import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

const stopIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

const NearbyStops = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [stops, setStops] = useState([]);

  // Dummy static stops near current location (for demo)
  const generateDummyStops = (lat, lng) => {
    return [
      { id: 1, name: "Stop A", lat: lat + 0.001, lng: lng + 0.001 },
      { id: 2, name: "Stop B", lat: lat - 0.0012, lng: lng + 0.0007 },
      { id: 3, name: "Stop C", lat: lat + 0.0005, lng: lng - 0.001 },
    ];
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lng: longitude });
        setStops(generateDummyStops(latitude, longitude));
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("⚠️ Unable to fetch location. Please allow location access.");
        setLoading(false);
      }
    );
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
        <p className="text-lg animate-pulse">📍 Fetching your location...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-red-500 font-semibold">
        {error}
      </div>
    );

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-6">
          <span className="text-green-400">Nearby</span> Bus Stops
        </h2>

        {/* Map Section */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700 mb-8">
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={16}
            style={{ height: "65vh", width: "100%" }}
            className="rounded-2xl"
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* User's location */}
            <Marker position={[location.lat, location.lng]}>
              <Popup>📍 You are here</Popup>
            </Marker>

            {/* Stops */}
            {stops.map((stop) => (
              <Marker
                key={stop.id}
                position={[stop.lat, stop.lng]}
                icon={stopIcon}
              >
                <Popup>🚌 {stop.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* List of Stops */}
        <section className="bg-gray-900/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-700">
          <h3 className="text-2xl font-semibold mb-4 text-green-400">
            Available Stops Nearby
          </h3>
          <ul className="space-y-3">
            {stops.map((stop) => (
              <li
                key={stop.id}
                className="bg-gray-800/70 border border-gray-700 p-4 rounded-xl flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:border-green-400"
              >
                <span className="text-green-400 text-lg">🚌</span>
                <span className="font-medium">{stop.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default NearbyStops;
