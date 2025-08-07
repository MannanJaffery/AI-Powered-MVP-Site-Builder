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
    <div>
      <h1>User Dashboard</h1>
      {products.length === 0 ? (
        <p>No products published yet.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>

              <Link to={`/${username}/${product.productName}`}>
                {product.productName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
