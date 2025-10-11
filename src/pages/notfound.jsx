import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F7F8F3] px-4">
  <div className="text-center max-w-md">
    <h1 className="text-6xl font-bold text-[#003F2F] mb-4">404</h1>
    <h2 className="text-2xl font-semibold text-[#003F2F] mb-2">Page Not Found</h2>
    <p className="text-[#90C1CA] mb-6">
      Sorry, the page you’re looking for doesn’t exist or has been moved.
    </p>
    <Link
      to="/"
      className="inline-block px-6 py-2 bg-[#46AA72] text-white font-medium rounded hover:bg-[#003F2F] transition"
    >
      Go Back Home
    </Link>
  </div>
</div>

  );
};

export default NotFoundPage;
