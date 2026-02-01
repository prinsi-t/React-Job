import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumber) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (passwordError) {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validatePassword(password);

    if (error) {
      setPasswordError(error);
      return;
    }

    setPasswordError("");

    // TEMP user (until backend auth)
    const user = {
      id: Date.now(),
      name: e.target.name.value,
      email: e.target.email.value,
    };

    login(user);          // ✅ store user
    navigate("/", { replace: true });
       // ✅ go home
  };

  const strength = calculatePasswordStrength(password);
  const strengthInfo = getStrengthInfo(strength);

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <input
          name="name"
          placeholder="Name"
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-3"
          required
        />

        <div className="mb-4">
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full border p-2 pr-10 rounded mb-2"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
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

          {password && (
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Password Strength:</span>
                <span className={`text-xs font-semibold ${
                  strengthInfo.label === "Weak" ? "text-red-500" :
                  strengthInfo.label === "Medium" ? "text-yellow-600" :
                  "text-green-600"
                }`}>
                  {strengthInfo.label}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${strengthInfo.color}`}
                  style={{ width: strengthInfo.width }}
                ></div>
              </div>
            </div>
          )}

          {passwordError && (
            <p className="text-red-500 text-sm mb-2">{passwordError}</p>
          )}

          <p className="text-gray-500 text-xs">
            Password must contain: 8+ characters, uppercase, lowercase, number, and special character
          </p>
        </div>

        <button 
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!password || validatePassword(password) !== ""}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;