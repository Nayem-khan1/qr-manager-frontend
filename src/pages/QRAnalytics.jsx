const QRAnalytics = ({ data }) => {
  const chartData = {
    series: [
      {
        name: "Scans",
        data: data.map((qr) => qr.totalScans),
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: { show: false },
      },
      xaxis: {
        categories: data.map((qr) => qr._id),
        title: { text: "QR Code ID", style: { fontSize: "14px" } },
      },
      yaxis: {
        title: { text: "Total Scans" },
      },
      colors: ["#6366F1"],
    },
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">
        QR Code Analytics
      </h2>

      {data.length === 0 ? (
        <p className="text-sm text-gray-500">No scans yet.</p>
      ) : (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={300}
        />
      )}

      {/* Country Summary */}
      <div className="mt-6">
        <h3 className="font-medium text-gray-700 mb-2">Top Countries</h3>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {data
            .flatMap((d) => d.countries || [])
            .map((c, i) => (
              <li key={i}>{c}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};
