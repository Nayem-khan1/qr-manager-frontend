import React from "react";

const CancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
      <p className="text-gray-700">You have cancelled the payment. Try again later if needed.</p>
    </div>
  );
};

export default CancelPage;
