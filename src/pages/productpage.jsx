import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import MainContent from "../components/maincontent";

const ProductPage = () => {
  const { username, productname } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const decodedUsername = decodeURIComponent(username);


  useEffect(() => {
    const fetchPage = async () => {
      try {
        // 1️⃣ Get user document by username
        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, where("username", "==", decodedUsername));
        const userSnap = await getDocs(userQuery);

        if (!userSnap.empty) {
          const userId = userSnap.docs[0].id;

          // 2️⃣ Get page document by productname
          const pagesRef = collection(db, "users", userId, "pages");
          const pageQuery = query(pagesRef, where("productName", "==", productname));
          const pageSnap = await getDocs(pageQuery);

          if (!pageSnap.empty) {
            setPageData(pageSnap.docs[0].data());
          } else {
            console.error("Page not found");
          }
        } else {
          console.error("User not found");
        }
      } catch (err) {
        console.error("Error fetching page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [username, productname]);

  if (loading) return <div>Loading...</div>;


  return (
    <MainContent
      editmaintitle={pageData?.title || null}
      editsubtitle={pageData?.subtitle || null}
      benefits={pageData?.benefits || null}
      parsedResponse={pageData?.parsedResponse}
      productName={pageData?.productName || null}
    />
  );
};

export default ProductPage;
