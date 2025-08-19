import { XCircle } from "lucide-react";

export default function Cancel() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg text-center">
        <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          Something went wrong with your payment. Please try again or use a
          different payment method.
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
