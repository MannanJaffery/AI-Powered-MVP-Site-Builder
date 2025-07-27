import  { useState } from "react";
import { auth, googleprovider, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock } from "lucide-react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleEmailRegister = async (e) => {
  e.preventDefault();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);

    // Save user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date(),
      emailVerified: false, // I will updarte it later , based on the verification
    });

    alert("Registration successful! Please check your email to verify your account.");
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
};

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleprovider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      alert("Google sign-in successful!");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-[430px] h-[540px] max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
    <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>
    <span>Welcome , please fill in the details to get started</span>

    {/* Google Register Button (Moved Above) */}
    <button
      onClick={handleGoogleRegister}
      className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:border-gray-400 py-3 rounded-lg transition duration-300 bg-white hover:bg-gray-50"
    >
      <FcGoogle size={24} />
      <span className="text-sm font-medium text-gray-700">Register with Google</span>
    </button>

    <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
      <hr className="w-full border-gray-300" />
      or
      <hr className="w-full border-gray-300" />
    </div>

    {/* Email Registration Form (Moved Below) */}
    <form onSubmit={handleEmailRegister} className="space-y-4">
      <div className="relative">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
      </div>
      <div className="relative">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
      >
        Register with Email
      </button>
    </form>

    <div className="mt-6 text-center text-sm text-gray-600">
      Already have an account?{" "}
      <a
        href="/login"
        className="text-blue-600 hover:underline font-medium"
      >
        Login
      </a>
    </div>
  </div>
</div>

  );
};

export default Register;
