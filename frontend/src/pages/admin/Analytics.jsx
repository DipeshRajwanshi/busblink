import { useEffect, useState } from "react";
import axios from "axios";

const Analytics = () => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchLogs = async () => {
    const token = await user.getIdToken();
    const res = await axios.get("/api/admin/logs", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page,
        limit,
        type: typeFilter,
        userUid: userFilter,
      },
    });
    setLogs(res.data.logs);
    setTotal(res.data.total);
  };

  useEffect(() => { fetchLogs(); }, [page, typeFilter, userFilter]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">System Logs</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <input className="border p-2" placeholder="Filter by Type" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} />
        <input className="border p-2" placeholder="Filter by User UID" value={userFilter} onChange={(e) => setUserFilter(e.target.value)} />
        <button className="bg-blue-500 text-white px-3 py-2 rounded" onClick={() => setPage(1)}>Apply</button>
      </div>

      {/* Logs Table */}
      <table className="w-full border mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Time</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Message</th>
            <th className="p-2 border">User</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td className="p-2 border">{new Date(log.createdAt).toLocaleString()}</td>
              <td className="p-2 border">{log.type}</td>
              <td className="p-2 border">{log.message}</td>
              <td className="p-2 border">{log.userUid}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between">
        <button disabled={page === 1} className="px-4 py-2 bg-gray-300 rounded" onClick={() => setPage(page - 1)}>Prev</button>
        <p>Page {page} of {totalPages}</p>
        <button disabled={page === totalPages} className="px-4 py-2 bg-gray-300 rounded" onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Analytics;
