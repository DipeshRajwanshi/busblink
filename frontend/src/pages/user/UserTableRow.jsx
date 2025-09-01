import React from "react";
import { Trash2 } from "lucide-react";

const UserTableRow = ({ user, index, onDelete }) => {
  return (
    <tr className="hover:bg-blue-50 transition">
      <td className="px-4 py-3">{index + 1}</td>
      <td className="px-4 py-3">{user.firstName} {user.lastName}</td>
      <td className="px-4 py-3">{user.email}</td>
      <td className="px-4 py-3 capitalize">{user.role}</td>
      <td className="px-4 py-3">
        <button
          className="text-red-600 hover:text-red-800"
          onClick={() => onDelete(user.id)}
          title="Delete User"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

export default UserTableRow;
