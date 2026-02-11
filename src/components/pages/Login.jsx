import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaHome } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // ✅ Validate email - must have @ OR .com
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    
    const hasAt = email.includes("@");
    const hasDotCom = email.includes(".com");
    
    if (!hasAt && !hasDotCom) {
      return "Email must contain @ or .com";
    }
    
    return "";
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (emailError) {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValidationError = validateEmail(email);

    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    setEmailError("");

    const user = {
      email: email,
    };

    login(user);
    navigate("/", { replace: true });
  };

  // ✅ Check if email is valid
  const isEmailValid = email && validateEmail(email) === "";

  return (
    <div className="min-h-screen bg-indigo-50">
      {/* ✅ Navbar with Home button */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            <FaHome className="text-xl" />
            Home
          </Link>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex items-center justify-center pt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Login</h2>

          {/* ✅ Email with custom validation */}
          <div className="mb-3">
            <input
              name="email"
              type="text"
              placeholder="Email"
              className="w-full border p-2 rounded"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded mb-4"
            required
          />

          {/* ✅ FIXED: Button only disabled if email is INVALID */}
          <button 
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!isEmailValid}
          >
            Login
          </button>

          <p className="text-center mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;