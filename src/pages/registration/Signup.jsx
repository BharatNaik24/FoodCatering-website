import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MyContext from "../../context/data/myContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(MyContext);
  const { loading, setLoading } = context;

  // Error message states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password validation: at least 8 characters, one number, one special character
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const signup = async () => {
    setLoading(true); // Start loading
    let hasError = false;

    // Reset error messages
    setNameError("");
    setEmailError("");
    setPasswordError("");

    // Name validation
    if (name.trim() === "") {
      setNameError("Please enter your name");
      hasError = true;
    } else if (name.length < 5) {
      setNameError("Name should be at least 3 characters long");
      hasError = true;
    }

    // Email validation
    if (email.trim() === "") {
      setEmailError("Please enter your email");
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    // Password validation
    if (password === "") {
      setPasswordError("Please enter your password");
      hasError = true;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password should be at least 8 characters long, contain at least one number and one special character"
      );
      hasError = true;
    }

    // If any validation error exists, return early
    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);
      console.log(users);

      const user = {
        name: name,
        email: users.user.email,
        password: password,
        uid: users.user.uid,
        time: new Date(),
      };

      const userRef = collection(fireDB, "users");
      await addDoc(userRef, user);

      toast.success("User Registered Successfully");

      // Clear input fields
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      toast.error("Error registering user");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <div>
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Signup
          </h1>
        </div>
        <div className="m-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            className="bg-gray-600 mb-1 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Name"
          />
          {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
        </div>
        <div className="m-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            className="bg-gray-600 mb-1 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>
        <div className="m-3">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="bg-gray-600 mb-1 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
        </div>
        <div className="flex justify-center m-3 ">
          <button
            onClick={signup}
            className="bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Signing Up..." : "Signup"}
          </button>
        </div>
        <div>
          <h2 className="text-white m-3">
            Have an account ?
            <span className="ml-2">
              <Link className="text-red-500 font-bold" to={"/login"}>
                Login
              </Link>
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;
