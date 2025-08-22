// productsContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./authContext";


const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  
  
  
  useEffect(() => {
    const fetchProducts = async () => {
      if (!currentUser?.uid) return;

      try {
        const pagesSnap = await getDocs(
          collection(db, "users", currentUser.uid, "pages")
        );
        const productList = pagesSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentUser?.uid]);

  return (
    <ProductsContext.Provider value={{ products, setProducts, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
