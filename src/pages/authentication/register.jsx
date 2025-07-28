import  { useState , useEffect } from "react";
import { auth, googleprovider, db } from "../../firebase";
import {createUserWithEmailAndPassword,sendEmailVerification,signInWithPopup} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import PasswordInput from "../../components/passwordInput";
import { Check } from "lucide-react";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {



  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showverificationmsg, setShowverificationMsg] = useState(false);
  const [isloading , setisloading] = useState(false);
  const [googleloading, setgoogleloading] = useState(false);

  const [alreadyuseemail,setAlreadyuseemail] = useState(false);








useEffect(() => {
  let interval;

  if (showverificationmsg) {
    interval = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload(); 
        if (user.emailVerified) {
          console.log("Email is now verified!");
          await setDoc(doc(db, "users", user.uid), {
            emailVerified: true,
          }, { merge: true });

          setShowverificationMsg("");
          setEmail("");
          setPassword("");

          navigate("/"); 
        }
      }
    }, 5000); 
  }

  return () => clearInterval(interval); 
}, [showverificationmsg]);


const handleEmailRegister = async (e) => {

  e.preventDefault();
  setisloading(true);
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
      emailVerified: false, 
    });

    setShowverificationMsg(true);


    // alert("Registration successful! Please check your email to verify your account.");
  } catch (error) {

      if (error.code === "auth/email-already-in-use") {
        setAlreadyuseemail(true);
     }
    console.error(error.message);
  }
  finally{
    setisloading(false);
  }
};

  const handleGoogleRegister = async () => {

    setgoogleloading(true);
    try {
        
      const result = await signInWithPopup(auth, googleprovider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      alert("Google sign-in successful!");
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }finally{
        setgoogleloading(false);
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-[430px] h-[560px] bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-between">
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
        <p className="text-gray-500 text-sm">Welcome! Please fill in the details to get started.</p>
      </div>



{showverificationmsg && (
  <div className="mt-4 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 shadow-sm transition-all duration-200">
    <Check className="h-4 w-4 text-green-500 mt-0.5" />
    <span className="leading-snug">
      We've sent a verification email — check your inbox or spam folder.
    </span>
  </div>
)}


{alreadyuseemail && (
<div className="mt-4 flex justify-center">
  <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 shadow-sm transition-all duration-200">
    <span className="leading-snug text-center">
      This email is already registered, kindly Login.
    </span>
  </div>
</div>
)}

      <button
        onClick={handleGoogleRegister}
        className={`w-full flex items-center justify-center gap-3 py-3 rounded-md transition duration-300
    ${googleloading ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400"}`}
      >
          {googleloading ? (
    <>
      <Loader className="h-4 w-4 animate-spin" />
      <span className="text-sm font-medium">Signing in...</span>
    </>
  ) : (
    <>
      <FcGoogle size={20} />
      <span className="text-sm font-medium">Continue with Google</span>
    </>
  )}
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
            onChange={(e) => {setEmail(e.target.value)
              setAlreadyuseemail(false);
            }}
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
            disabled={isloading}
            className={`w-full py-2 rounded-lg font-medium text-sm transition disabled:opacity-50 disabled:cursor-not-allowed
                ${isloading ? "bg-purple-300 text-white" : "bg-purple-800 text-white hover:bg-purple-700"}
            `}
            >
            {isloading ? (
                <div className="flex items-center justify-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
                </div>
            ) : (
                "Continue"
            )}
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
