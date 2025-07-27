import { useState } from "react";
import { auth, googleprovider } from "../../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import PasswordInput from "../../components/passwordInput";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className=" w-[430px] h-[460px] max-w-md p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-xl font-semibold text-center mb-1">
          Sign in to WaitlistNow
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Welcome back! Please sign in to continue
        </p>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          <FcGoogle size={20} />
          <span className="font-medium text-sm text-gray-700">
            {loading ? "Signing in..." : "Continue with Google"}
          </span>
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <hr className="flex-grow border-gray-300" />
          or
          <hr className="flex-grow border-gray-300" />
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium text-gray-700">
              Password
            </label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 font-medium text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Continue"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
