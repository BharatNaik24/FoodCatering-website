import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/data/myContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const context = useContext(MyContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  // Helper function to validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    // Reset previous error messages
    setEmailError("");
    setPasswordError("");

    // Check if email is valid
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    }

    // Check if password is valid
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    }

    return isValid;
  };

  const signIn = async () => {
    if (!validateForm()) {
      return; // If form is not valid, don't proceed
    }

    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(result));
      toast.success("Signin Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <div>
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Login
          </h1>
        </div>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            className={`bg-gray-600 mb-2 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none ${
              emailError && "border border-red-500"
            }`}
            placeholder="Email"
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`bg-gray-600 mb-2 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none ${
              passwordError && "border border-red-500"
            }`}
            placeholder="Password"
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
        </div>
        <div className="flex justify-center mb-3">
          <button
            onClick={signIn}
            className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Don't have an account?{" "}
            <Link className="text-yellow-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
