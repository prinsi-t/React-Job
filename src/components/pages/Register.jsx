import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const currentYear = new Date().getFullYear();

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  const getStrengthInfo = (strength) => {
    if (strength === 0) return { label: "", color: "", width: "0%" };
    if (strength <= 2) return { label: "Weak", color: "bg-red-500", width: "33%" };
    if (strength <= 4) return { label: "Medium", color: "bg-yellow-500", width: "66%" };
    return { label: "Strong", color: "bg-green-500", width: "100%" };
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) return "Password must be at least 8 characters long";
    if (!hasUpperCase) return "Password must contain at least one uppercase letter";
    if (!hasLowerCase) return "Password must contain at least one lowercase letter";
    if (!hasNumber) return "Password must contain at least one number";
    if (!hasSpecialChar) return "Password must contain at least one special character";
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const hasAt = email.includes("@");
    const hasDotCom = email.includes(".com");
    if (!hasAt && !hasDotCom) return "Email must contain @ or .com";
    return "";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (passwordError) setPasswordError("");
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (emailError) setEmailError("");
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
      id: Date.now(),
      name: e.target.name.value,
      email: email,
    };

    login(user);
    navigate("/", { replace: true });
  };

  const strength = calculatePasswordStrength(password);
  const strengthInfo = getStrengthInfo(strength);
  const isEmailValid = email && validateEmail(email) === "";
  const isPasswordValid = password && validatePassword(password) === "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex flex-col relative overflow-hidden">
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700/10 rounded-full blur-3xl animate-float animation-delay-600"></div>
      </div>

      {/* Register Form */}
      <div className="flex-grow flex items-center justify-center px-6 py-20 relative z-10">
        <div className="modern-card max-w-md w-full hover-lift animate-fadeInUp">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <input
              name="name"
              placeholder="Name"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300"
              required
            />

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
            <div>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-3 pr-10 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Password Strength */}
              {password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Password Strength:</span>
                    <span className={`text-xs font-semibold ${
                      strengthInfo.label === "Weak" ? "text-red-400" :
                      strengthInfo.label === "Medium" ? "text-yellow-400" :
                      "text-green-400"
                    }`}>
                      {strengthInfo.label}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${strengthInfo.color}`}
                      style={{ width: strengthInfo.width }}
                    ></div>
                  </div>
                </div>
              )}

              {passwordError && (
                <p className="text-red-400 text-sm mt-1">{passwordError}</p>
              )}

              <p className="text-gray-500 text-xs mt-2">
                Password must contain: 8+ characters, uppercase, lowercase, number, and special character
              </p>
            </div>

            {/* Submit Button */}
            <button 
              className="btn-modern w-full bg-gradient-to-r from-blue-700 to-blue-600 text-white py-3 rounded-lg font-semibold hover-lift disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              disabled={!isEmailValid || !isPasswordValid}
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300">
              Login
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

export default Register;