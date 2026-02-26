import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
const [passwordError, setPasswordError] = useState("");
  const currentYear = new Date().getFullYear();

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    
    const hasAt = email.includes("@");
    const hasDotCom = email.includes(".com");
    
    if (!hasAt && !hasDotCom) {
      return "Email must contain @ or .com";
    }
    
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
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
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
  
    const user = {
      email,
      password,
    };
  
    login(user);
    navigate("/", { replace: true });
  };

  const isEmailValid = email && validateEmail(email) === "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex flex-col relative overflow-hidden">
      
      

      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700/10 rounded-full blur-3xl animate-float animation-delay-600"></div>
      </div>

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center px-6 py-20 relative z-10">
        <div className="modern-card max-w-md w-full hover-lift animate-fadeInUp">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <input
                name="email"
                type="text"
                placeholder="Email"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && (
                <p className="text-red-400 text-sm mt-1">{emailError}</p>
              )}
            </div>

            {/* Password */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
  onChange={(e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError("");

    {passwordError && (
      <p className="text-red-400 text-sm mt-1">{passwordError}</p>
    )}
  }}
  
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300"
              required
            />

            {/* Submit Button */}
            <button 
              className="btn-modern cursor-pointer w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-900 text-white py-3 rounded-lg font-semibold hover-lift disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              disabled={!isEmailValid}
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center mt-6 text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300">
              Register
            </Link>
          </p>

          {/* Home Link */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <Link to="/" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
              ← Back to Home
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