import { useState } from "react";
import { auth, googleprovider, db } from "../../firebase";
import {createUserWithEmailAndPassword,  signInWithPopup} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { fetchSignInMethodsForEmail } from "firebase/auth";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Email/Password Sign Up
  const handleEmailRegister = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;

      // Save user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
        provider: "email",
      });

      alert("Registered successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  // Google Sign In

const handleGoogleSignIn = async () => {
  try {
    // First, open Google sign-in popup
    const result = await signInWithPopup(auth, googleprovider);
    const user = result.user;

    // Then check what sign-in methods are available for this email
    const methods = await fetchSignInMethodsForEmail(auth, user.email);

    // If user signed in with Google, but this email exists for another provider
    if (methods.length > 0 && !methods.includes("google.com")) {
      alert("This email is already registered with a different method. Please use that to log in.");
      return;
    }

    // Save user to Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      createdAt: new Date(),
      provider: "google",
    });

    alert("Signed in with Google!");
  } catch (error) {
    console.error("Google Sign-in Error:", error);
    alert("Error: " + error.message);
  }
};


  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>Register</h2>

      <form onSubmit={handleEmailRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", margin: "1rem 0", width: "100%" }}
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", margin: "1rem 0", width: "100%" }}
        />

        <button type="submit" style={{ width: "100%", padding: "0.5rem" }}>
          Register with Email
        </button>
      </form>

      <hr style={{ margin: "2rem 0" }} />

      <button
        onClick={handleGoogleSignIn}
        style={{ width: "100%", padding: "0.5rem" }}
      >
        Continue with Google
      </button>
    </div>
  );
};

export default Register;
