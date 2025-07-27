import  { useState } from "react";
import { auth, googleprovider, db } from "../../firebase";
import {createUserWithEmailAndPassword,sendEmailVerification,signInWithPopup} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import PasswordInput from "../../components/passwordInput";

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


    await sendEmailVerification(user);

    // Save user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date(),
      emailVerified: false,  // I will updarte it later , based on the verification
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
  <div className="w-[430px] h-[540px] bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-between">
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
        <p className="text-gray-500 text-sm">Welcome! Please fill in the details to get started.</p>
      </div>

      <button
        onClick={handleGoogleRegister}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:border-gray-400 py-3 rounded-md transition duration-300 bg-white hover:bg-gray-50"
      >
        <FcGoogle size={20} />
        <span className="text-sm font-medium text-gray-700">Continue with Google</span>
      </button>

      <div className="flex items-center text-gray-400 text-sm">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-3">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <form onSubmit={handleEmailRegister} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email address</label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
            
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Password</label>

      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 font-medium text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </form>
    </div>

    <div className="text-center text-sm text-gray-600 mt-4">
      Already have an account?{" "}
      <a href="/login" className="text-blue-600 hover:underline font-medium">
        Sign in
      </a>
    </div>
  </div>
</div>


  );
};

export default Register;
