import { useState } from "react";
import { auth, googleprovider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Email/Password Sign In
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleprovider);
      alert("Signed in with Google!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>Login</h2>

      <form onSubmit={handleEmailLogin}>
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", margin: "1rem 0", width: "100%" }}
        />

        <button type="submit" style={{ width: "100%", padding: "0.5rem" }}>
          Login with Email
        </button>
      </form>

      <hr style={{ margin: "2rem 0" }} />

      <button onClick={handleGoogleSignIn} style={{ width: "100%", padding: "0.5rem" }}>
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
