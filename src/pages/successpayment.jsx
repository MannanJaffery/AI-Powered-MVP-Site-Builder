import { CheckCircle } from "lucide-react";

export default function Success() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">
          Payment Successful
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your subscription has been activated
          successfully.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          Go to HomePage
        </a>
      </div>
    </div>
  );
}
