import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

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

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          required
        />

        <button className="w-full bg-indigo-500 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
