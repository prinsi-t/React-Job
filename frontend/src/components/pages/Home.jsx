import { Link } from "react-router-dom";
import { FaTwitter, FaYoutube, FaFacebook, FaArrowRight, FaBriefcase, FaRocket, FaUsers, FaCode } from "react-icons/fa";

const Home = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex flex-col relative overflow-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Inter:wght@300;400;500&display=swap');

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.03em;
        }
        .hero-sub {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
        }
        .stat-num {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.8s ease forwards; }
        .animate-fadeUp-delay1 { animation: fadeUp 0.8s ease 0.15s forwards; opacity: 0; }
        .animate-fadeUp-delay2 { animation: fadeUp 0.8s ease 0.3s forwards; opacity: 0; }
        .animate-fadeUp-delay3 { animation: fadeUp 0.8s ease 0.45s forwards; opacity: 0; }
        .animate-fadeUp-delay4 { animation: fadeUp 0.8s ease 0.6s forwards; opacity: 0; }
        .badge-glow {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        }
        .btn-primary {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(37, 99, 235, 0.4);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(37, 99, 235, 0.6);
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }
        .btn-secondary {
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(99,179,237,0.4);
          transform: translateY(-2px);
        }
        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(59,130,246,0.3);
          transform: translateY(-4px);
        }
        .divider-line {
          background: linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent);
        }
        .text-shimmer {
          background: linear-gradient(135deg, #60a5fa, #a78bfa, #60a5fa);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer {
          to { background-position: 200% center; }
        }
      `}</style>

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div style={{ animation: 'float 8s ease-in-out infinite' }} className="absolute top-20 left-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div style={{ animation: 'float 10s ease-in-out 2s infinite' }} className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-blue-800/10 rounded-full blur-3xl"></div>
        <div style={{ animation: 'float 12s ease-in-out 4s infinite' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-900/10 rounded-full blur-3xl"></div>
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">

        {/* Badge */}
        <div className="animate-fadeUp mb-8">
          <span className="badge-glow inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-medium px-4 py-2 rounded-full">
            <FaRocket className="w-3 h-3" />
            #1 Platform for React Developers
          </span>
        </div>

        {/* Headline */}
        <h1 className="hero-title animate-fadeUp-delay1 text-5xl md:text-7xl text-white max-w-4xl mx-auto mb-6">
          Your Next{" "}
          <span className="text-shimmer">React Role</span>
          <br />
          Starts Here.
        </h1>

        {/* Subheading */}
        <p className="hero-sub animate-fadeUp-delay2 text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
          ReactJobs connects talented developers with top-tier companies building the future of the web. 
          Stop scrolling generic job boards — every listing here is curated for React, 
          Next.js, and frontend engineers.
        </p>

        <p className="hero-sub animate-fadeUp-delay2 text-slate-400 text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Whether you're a senior architect or just shipped your first side project, 
          there's a role waiting for you. Full-time, freelance, remote, hybrid — we've got it all.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fadeUp-delay3 flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            to="/login"
            className="btn-primary text-white px-8 py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2"
          >
            Browse Jobs <FaArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/register"
            className="btn-secondary text-white px-8 py-4 rounded-xl font-semibold text-base"
          >
            Create Free Account
          </Link>
        </div>

        {/* Stats Row */}
        <div className="animate-fadeUp-delay4 flex flex-wrap justify-center gap-10 mb-20">
          {[
            { num: "10K+", label: "Active Jobs" },
            { num: "3K+", label: "Companies Hiring" },
            { num: "50K+", label: "Developers Placed" },
            { num: "98%", label: "Satisfaction Rate" },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <p className="stat-num text-3xl text-white">{num}</p>
              <p className="text-slate-400 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider-line w-full max-w-3xl h-px mb-20"></div>

        {/* Feature Cards */}
        <div className="animate-fadeUp-delay4 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl w-full mx-auto mb-24">
          {[
            {
              icon: <FaBriefcase className="w-5 h-5 text-blue-400" />,
              title: "Curated Listings",
              desc: "Every job is hand-picked and verified. No spam, no dead links — only real opportunities from companies that are actively hiring React talent right now.",
            },
            {
              icon: <FaCode className="w-5 h-5 text-purple-400" />,
              title: "Built for Developers",
              desc: "Filter by stack, seniority, salary, and location. We speak your language — TypeScript, Next.js, Redux, GraphQL. Find exactly what you're looking for.",
            },
            {
              icon: <FaUsers className="w-5 h-5 text-green-400" />,
              title: "Global Community",
              desc: "Join tens of thousands of React developers worldwide. From Silicon Valley startups to European scaleups — your perfect team is already on ReactJobs.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="feature-card rounded-2xl p-6 text-left">
              <div className="mb-4 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                {icon}
              </div>
              <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Testimonial strip */}
        <div className="animate-fadeUp-delay4 max-w-2xl mx-auto text-center mb-8">
          <p className="text-slate-300 text-base italic leading-relaxed">
            "I landed my dream remote job at a Series B startup within 2 weeks of signing up. 
            The quality of listings here is unmatched — every company I applied to actually responded."
          </p>
          <p className="text-blue-400 text-sm font-medium mt-3">— Priya S., Senior React Developer</p>
        </div>

      </section>

      {/* ── FOOTER ── */}
      <footer className="relative mt-auto z-10 bg-gradient-to-br from-slate-950/95 via-blue-950/95 to-slate-950/95 backdrop-blur-sm border-t border-white/10">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{ animation: 'float 10s ease-in-out infinite' }} className="absolute bottom-10 right-20 w-[400px] h-[400px] bg-blue-800/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <h6 className="text-lg font-semibold text-white mb-4">Services</h6>
              {["Branding", "Design", "Marketing", "Advertisement"].map(s => (
                <a key={s} href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">{s}</a>
              ))}
            </div>
            <div className="space-y-3">
              <h6 className="text-lg font-semibold text-white mb-4">Company</h6>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">About us</a>
              <Link to="/jobs" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Jobs</Link>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Contact</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Press kit</a>
            </div>
            <div className="space-y-3">
              <h6 className="text-lg font-semibold text-white mb-4">Legal</h6>
              {["Terms of use", "Privacy policy", "Cookie policy"].map(s => (
                <a key={s} href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">{s}</a>
              ))}
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img src="/logo.png" alt="ReactJobs Logo" className="w-10 h-10 object-contain" />
                <span className="text-xl font-bold text-white">ReactJobs.com</span>
              </div>
              <p className="text-white/70 text-sm">Providing reliable tech jobs since {currentYear - 5}</p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-white/70 text-sm">© {currentYear} ReactJobs Industries Ltd. All rights reserved.</p>
              <div className="flex space-x-4">
                {[
                  { Icon: FaTwitter, hover: "hover:bg-blue-600" },
                  { Icon: FaYoutube, hover: "hover:bg-red-600" },
                  { Icon: FaFacebook, hover: "hover:bg-blue-600" },
                ].map(({ Icon, hover }, i) => (
                  <a key={i} href="#" className={`p-2 bg-white/5 rounded-lg ${hover} transition-all duration-300 hover:scale-110 text-white`}>
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;