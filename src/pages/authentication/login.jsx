import { useState } from "react";
import { auth, googleprovider } from "../../firebase";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (err) {
      console.error("Email login error:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

const handleGoogleSignIn = async () => {
  try {
    
    const result = await signInWithPopup(auth, googleprovider);
    const user = result.user;
    console.log("Signed in with Google:", user.email);
  } catch (error) {
    console.error("Google sign-in error:", error.message);
  }
};


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login with Email"}
        </button>
      </form>

      <div className="my-6 flex items-center justify-center">
        <hr className="flex-grow border-t" />
        <span className="px-4 text-gray-500 text-sm">OR</span>
        <hr className="flex-grow border-t" />
      </div>

      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FcGoogle size={20} />
        <span className="font-medium text-gray-700">
          {loading ? "Signing in..." : "Continue with Google"}
        </span>
      </button>

      <div className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a
          href="/register"
          className="text-blue-600 hover:underline font-medium"
        >
          Register
        </a>
      </div>
    </div>
  );
};

export default Login;