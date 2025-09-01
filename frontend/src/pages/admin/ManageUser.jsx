import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import UserTableRow from "../../pages/admin/UserTableRow";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const list = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((u) => u.role === "user");
    setUsers(list);
    setFiltered(list);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const lower = search.toLowerCase();
      setFiltered(
        users.filter((u) =>
          `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(lower)
        )
      );
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, users]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      await deleteDoc(doc(db, "users", id));
      fetchUsers();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">👥 Manage Users</h1>

      <input
        type="text"
        className="mb-4 p-2 border rounded-md w-full max-w-md"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, index) => (
              <UserTableRow
                key={user.id}
                user={user}
                index={index}
                onDelete={handleDelete}
              />
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
