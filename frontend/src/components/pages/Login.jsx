import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaTwitter, FaYoutube, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (emailError) {
      setEmailError(validateEmail(newEmail));
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (passwordError) {
      setPasswordError(validatePassword(newPassword));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
  
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }
  
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }
  
    setEmailError("");
    setPasswordError("");
    setSubmitError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data?.message || "Login failed");
        setIsLoading(false);
        return;
      }

      login(data);
      navigate("/", { replace: true });
    } catch {
      setSubmitError("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  const isEmailValid = email && validateEmail(email) === "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex flex-col relative overflow-hidden">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        
        .login-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-background-clip: text;
          -webkit-text-fill-color: #ffffff;
          transition: background-color 5000s ease-in-out 0s;
          box-shadow: inset 0 0 20px 20px rgba(255, 255, 255, 0.1);
        }
      `}</style>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700/10 rounded-full blur-3xl animate-float animation-delay-600"></div>
      </div>

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center px-6 py-20 relative z-10">
        <div className="modern-card max-w-lg w-full hover-lift animate-fadeInUp px-8 md:px-10">
          
          {/* Title with different font */}
          <h2 className="login-title text-4xl font-bold mb-3 text-white text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Log In
          </h2>

          {/* Welcome message */}
          <p className="text-base mb-8 text-gray-300 text-center leading-relaxed">
            👋 Welcome back! Log in to access your account and explore new opportunities.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto">
            
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="your.email@example.com"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                value={email}
                onChange={handleEmailChange}
                required
                disabled={isLoading}
              />
              {emailError && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <span className="mr-1">⚠️</span> {emailError}
                </p>
              )}
            </div>

            {/* Password with show/hide */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 p-3 pr-12 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300 p-1"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <span className="mr-1">⚠️</span> {passwordError}
                </p>
              )}
              
              {/* Forgot Password Link */}
              <div className="text-right mt-2">
                <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Error */}
            {submitError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-400 text-sm flex items-center">
                  <span className="mr-2">❌</span> {submitError}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit"
              className="btn-modern cursor-pointer w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3.5 rounded-lg font-bold text-lg hover-lift transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Log In →"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-gray-400">or</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-bold transition-colors duration-300 underline underline-offset-2">
              Create one now
            </Link>
          </p>

          {/* Home Link */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <Link to="/" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300 flex items-center justify-center">
              <span className="mr-2">←</span> Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative mt-auto z-10 bg-gradient-to-br from-slate-950/95 via-blue-950/95 to-slate-950/95 backdrop-blur-sm border-t border-white/10">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-10 right-20 w-[400px] h-[400px] bg-blue-800/10 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="relative container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Services */}
            <div className="space-y-3 animate-fadeInUp">
              <h6 className="text-lg font-semibold text-white mb-4">Services</h6>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Branding</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Design</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Marketing</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Advertisement</a>
            </div>

            {/* Company */}
            <div className="space-y-3 animate-fadeInUp animation-delay-200">
              <h6 className="text-lg font-semibold text-white mb-4">Company</h6>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">About us</a>
              <Link to="/jobs" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Jobs</Link>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Contact</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Press kit</a>
            </div>

            {/* Legal */}
            <div className="space-y-3 animate-fadeInUp animation-delay-400">
              <h6 className="text-lg font-semibold text-white mb-4">Legal</h6>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Terms of use</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Privacy policy</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Cookie policy</a>
            </div>

            {/* Brand */}
            <div className="space-y-4 animate-fadeInUp animation-delay-600">
              <div className="flex items-center space-x-3">
                <img src="/logo.png" alt="ReactJobs Logo" className="w-10 h-10 object-contain animate-glow" />
                <span className="text-xl font-bold text-white">ReactJobs.com</span>
              </div>
              <p className="text-white/70 text-sm">Providing reliable tech jobs since {currentYear - 5}</p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-white/70 text-sm">© {currentYear} ReactJobs Industries Ltd. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover-glow text-white" aria-label="Twitter">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-red-600 transition-all duration-300 hover:scale-110 hover-glow text-white" aria-label="YouTube">
                  <FaYoutube className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover-glow text-white" aria-label="Facebook">
                  <FaFacebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
