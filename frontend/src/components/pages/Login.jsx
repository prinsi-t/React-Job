import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaTwitter, FaYoutube, FaFacebook, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";

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
  const [loadingMessage, setLoadingMessage] = useState("Logging in...");
  const currentYear = new Date().getFullYear();
  const API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    setLoadingMessage("Logging in...");

    const messageTimer = setTimeout(() => {
      setLoadingMessage("Server is waking up... (first login takes ~30 seconds)");
    }, 3000);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      clearTimeout(messageTimer);
      
      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data?.message || "Login failed");
        setIsLoading(false);
        return;
      }

      login(data);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 50);
    } catch (error) {
      clearTimeout(messageTimer);
      setSubmitError("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex flex-col relative overflow-hidden">
      
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-60">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
      </div>

      {/* Static orbs for depth */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-blue-800/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-900/10 rounded-full blur-3xl"></div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>

      {/* Back to Home */}
      <div className="relative z-10 container mx-auto px-6 pt-8">
        <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm font-medium">
          <span className="mr-2">←</span> Back to Home
        </Link>
      </div>

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center px-6 py-12 relative z-10">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
          
          {/* Title */}
          <h2 className="text-4xl font-bold mb-2 text-white text-center tracking-tight">
            Log In
          </h2>

          {/* Subtitle */}
          <p className="text-base mb-8 text-slate-300 text-center">
            👋 Welcome back! Log in to access your account and explore new opportunities.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
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

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 px-4 py-3 pr-12 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-300 p-1"
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
              
              {/* Forgot Password */}
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
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3.5 rounded-lg font-semibold text-base shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {loadingMessage}
                </span>
              ) : (
                <>
                  Log In
                  <FaArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Loading Helper Message */}
            {isLoading && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mt-3">
                <p className="text-blue-300 text-xs text-center animate-pulse">
                  ⏱️ First login after inactivity may take up to 30 seconds
                </p>
              </div>
            )}
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-slate-400">or</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-slate-300 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative mt-auto z-10 bg-gradient-to-br from-slate-950/95 via-blue-950/95 to-slate-950/95 backdrop-blur-sm border-t border-white/10">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-10 right-20 w-[400px] h-[400px] bg-blue-800/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Services */}
            <div className="space-y-3">
              <h6 className="text-lg font-semibold text-white mb-4">Services</h6>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Branding</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Design</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Marketing</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Advertisement</a>
            </div>

            {/* Company */}
            <div className="space-y-3">
              <h6 className="text-lg font-semibold text-white mb-4">Company</h6>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">About us</a>
              <Link to="/jobs" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Jobs</Link>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Contact</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Press kit</a>
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <h6 className="text-lg font-semibold text-white mb-4">Legal</h6>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Terms of use</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Privacy policy</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Cookie policy</a>
            </div>

            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img src="/logo.png" alt="ReactJobs Logo" className="w-10 h-10 object-contain" />
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
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110 text-white" aria-label="Twitter">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-red-600 transition-all duration-300 hover:scale-110 text-white" aria-label="YouTube">
                  <FaYoutube className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110 text-white" aria-label="Facebook">
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