import React from "react";

const colorMap = {
  indigo: "bg-indigo-100 text-indigo-600",
  green: "bg-green-100 text-green-600",
  violet: "bg-violet-100 text-violet-600",
  blue: "bg-blue-100 text-blue-600",
  red: "bg-red-100 text-red-600",
};

const OverviewCard = ({ title, value, icon: Icon, color = "indigo" }) => {
  const iconStyle = colorMap[color] || colorMap.indigo;

  return (
    <div className="rounded-lg border border-gray-300 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-500">{title}</h4>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>

        {Icon && (
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center ${iconStyle}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewCard;
