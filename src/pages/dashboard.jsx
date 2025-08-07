import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import useUsername from "../services/getcurrentusername";

const Dashboard = () => {

  const username = useUsername();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Directly get pages for this UID
        const pagesRef = collection(db, "users", id, "pages");
        const pagesSnap = await getDocs(pagesRef);

        const productsList = pagesSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
  <div className="max-w-7xl mx-auto px-4 py-8">
    {/* Header */}
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {username}'s Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          All your published products in one place.
        </p>
      </div>
      <Link
        to="/new-project"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition text-sm font-medium"
      >
        + New Product
      </Link>
    </div>

    {/* No Products */}
    {products.length === 0 ? (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center shadow-sm">
        <p className="text-gray-500 text-lg">No products published yet.</p>
        <Link
          to="/new-project"
          className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Create Your First Product
        </Link>
      </div>
    ) : (
      /* Product Grid */
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/${username}/${product.productName}`}
            className="group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
          >
            <div className="p-5 flex flex-col justify-between h-full">
              {/* Product Name */}
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                {product.productName}
              </h2>

              {/* Published Date */}
              <div className="mt-4 text-xs text-gray-400">
                Published on{" "}
                {product.createdAt
                  ? new Date(product.createdAt.seconds * 1000).toLocaleDateString()
                  : "Unknown date"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
  );
};

export default Dashboard;