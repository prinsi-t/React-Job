import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaHome } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: e.target.email.value,
    };

    login(user);
    navigate("/", { replace: true });
  };

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

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded mb-3"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded mb-4"
            required
          />

          <button className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600">
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