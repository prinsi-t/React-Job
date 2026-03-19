import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

const ViewAllJobs = () => {
        const currentYear = new Date().getFullYear();

  return (
    <>
    <section className="max-w-lg my-8 px-6 mx-auto text-center">
      <Link 
        to="/jobs" 
        className="btn-modern inline-block bg-gradient-to-r from-slate-900 to-slate-800 hover:from-blue-700 hover:to-blue-600 text-white py-4 px-8 rounded-xl font-semibold hover-lift shadow-2xl transition-all duration-300 animate-fadeInUp border border-white/10"
      >
        View All Jobs →
      </Link>

      
    </section>
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
            </>
  )
}

export default ViewAllJobs