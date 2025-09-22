import React from "react";
import { Loader2 } from "lucide-react";

const StatCard = ({
  label,
  value,
  icon,
  color = "bg-gray-100 text-gray-700",
  loading = false,
  progress = null, 
}) => {
  return (
    <div
      className={`relative p-4 rounded-lg shadow-sm border hover:shadow-md transition duration-200 ${color}`}
    >
      <div className="flex items-center gap-4">
        <div className="text-3xl">{icon}</div>

        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          {loading ? (
            <Loader2 className="animate-spin mt-1 text-gray-500" />
          ) : (
            <p className="text-xl font-bold transition-all duration-300">
              {value}
            </p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {progress !== null && (
        <div className="mt-3">
          <div className="w-full h-2 bg-white/30 rounded-full">
            <div
              className="h-2 bg-green-600 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-1">{progress}% completed</p>
        </div>
      )}
    </div>
  );
};

export default StatCard;
