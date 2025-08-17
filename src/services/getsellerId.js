import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

const getSellerId = async () => {
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("User ID not available");

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      return data.stripeAccountId || null;
    } else {
      return null; 
    }
  } catch (error) {
    console.error("Error fetching seller ID:", error);
    return null;
  }
};

export default getSellerId;
