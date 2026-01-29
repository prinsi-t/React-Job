import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50">
      <div className="bg-white p-10 rounded-xl shadow-md text-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-indigo-600">
          Welcome to JobFinder
        </h1>

        <p className="text-gray-600 mb-6">
          Find your dream job faster 🚀
        </p>

        <div className="space-y-4">
          <Link
            to="/login"
            className="block bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="block border border-indigo-500 text-indigo-600 hover:bg-indigo-50 py-2 rounded-lg"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
