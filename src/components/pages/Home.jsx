import { Link } from "react-router-dom";
import { FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

const Home = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex flex-col relative overflow-hidden">
      
      {/* Floating Background Elements - Only for main content */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700/10 rounded-full blur-3xl animate-float animation-delay-600"></div>
      </div>

      {/* Hero Section */}
      <div className="flex-grow flex items-center justify-center px-6 py-20 relative z-10">
        
        {/* Main Card */}
        <div className="modern-card max-w-md w-full text-center hover-lift animate-fadeInUp">

          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              Welcome to
            </span>
            <br />
            <span className="text-white">ReactJobs.com</span>
          </h1>

          <p className="text-gray-400 mb-8 text-lg">
            Find your dream job faster 🚀
            <br />
            Explore thousands of job listings and find the perfect job for you.
          </p>

          <div className="space-y-4">
            <Link
              to="/login"
              className="btn-modern bg-gradient-to-r from-blue-700 to-blue-600 text-white py-3 rounded-lg font-semibold hover-lift w-full block shadow-2xl"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn-modern glass text-white py-3 rounded-lg font-semibold hover-lift w-full block"
            >
              Register
            </Link>
          </div>

          {/* Updated Message */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-sm">
              Sign in or register to browse jobs
            </p>
          </div>
        </div>
      </div>

      {/* Footer - Distinct but with slight blend */}
      <footer className="relative mt-auto z-10 bg-gradient-to-br from-slate-950/95 via-blue-950/95 to-slate-950/95 backdrop-blur-sm border-t border-white/10">
        
        {/* Darker overlay to make footer distinct */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Subtle floating orb for footer only */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-10 right-20 w-[400px] h-[400px] bg-blue-800/10 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="relative container mx-auto px-6 py-12">
          
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Services */}
            <div className="space-y-3 animate-fadeInUp">
              <h6 className="text-lg font-semibold text-white mb-4">Services</h6>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
                Branding
              </a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
                Design
              </a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
                Marketing
              </a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
                Advertisement
              </a>
            </div>

            {/* Company */}
            <div className="space-y-3 animate-fadeInUp animation-delay-200">
              <h6 className="text-lg font-semibold text-white mb-4">Company</h6>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
                About us
              </a>
              <Link to="/jobs" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
                Jobs
              </Link>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
                Contact
              </a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
                Press kit
              </a>
            </div>

            {/* Legal */}
            <div className="space-y-3 animate-fadeInUp animation-delay-400">
              <h6 className="text-lg font-semibold text-white mb-4">Legal</h6>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
                Terms of use
              </a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
                Privacy policy
              </a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
                Cookie policy
              </a>
            </div>

            {/* Brand */}
            <div className="space-y-4 animate-fadeInUp animation-delay-600">
              <div className="flex items-center space-x-3">
                <img 
                  src="/logo.png" 
                  alt="ReactJobs Logo" 
                  className="w-10 h-10 object-contain animate-glow"
                />
                <span className="text-xl font-bold text-white">
                  ReactJobs.com
                </span>
              </div>
              <p className="text-white/70 text-sm">
                Providing reliable tech jobs since {currentYear - 5}
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <p className="text-white/70 text-sm">
                © {currentYear} ReactJobs Industries Ltd. All rights reserved.
              </p>

              {/* Social Icons */}
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="p-2 bg-white/5 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover-glow text-white"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="p-2 bg-white/5 rounded-lg hover:bg-red-600 transition-all duration-300 hover:scale-110 hover-glow text-white"
                  aria-label="YouTube"
                >
                  <FaYoutube className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="p-2 bg-white/5 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover-glow text-white"
                  aria-label="Facebook"
                >
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

export default Home;