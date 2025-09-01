import { useEffect, useState } from "react";
import axios from "axios";

const DriverPanel = () => {
  const [bus, setBus] = useState(null);

  useEffect(() => {
    const fetchBus = async () => {
      const token = await user.getIdToken();
      const res = await axios.get("/api/buses/my-bus", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBus(res.data);
    };
    fetchBus();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Driver Dashboard</h1>
      {bus ? (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">{bus.busNumber}</h2>
          <p>{bus.route.source} → {bus.route.destination}</p>
          <p>Type: {bus.type}</p>
          <p>Contact: {bus.contact}</p>
        </div>
      ) : (
        <p>No bus data yet.</p>
      )}
    </div>
  );
};

export default DriverPanel;
