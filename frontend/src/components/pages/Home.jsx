import { Link } from "react-router-dom";
import { FaArrowRight, FaBriefcase, FaRocket, FaUsers, FaCode } from "react-icons/fa";

const Home = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex flex-col relative overflow-hidden">

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div style={{ animation: 'float 8s ease-in-out infinite' }} className="absolute top-20 left-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div style={{ animation: 'float 10s ease-in-out 2s infinite' }} className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-blue-800/10 rounded-full blur-3xl"></div>
        <div style={{ animation: 'float 12s ease-in-out 4s infinite' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-900/10 rounded-full blur-3xl"></div>
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">

        {/* Badge */}
        <div className="animate-fade-up mb-8">
          <span className="shadow-[0_0_20px_rgba(59,130,246,0.4)] inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-medium px-4 py-2 rounded-full">
            <FaRocket className="w-3 h-3" />
            #1 Platform for React Developers
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-syne font-black leading-[1.05] tracking-[-0.03em] animate-fade-up-delay1 text-5xl md:text-7xl text-white max-w-4xl mx-auto mb-6">
          Your Next{" "}
          <span className="bg-gradient-to-r from-[#60a5fa] via-[#a78bfa] to-[#60a5fa] bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer">React Role</span>
          <br />
          Starts Here.
        </h1>

        {/* Subheading */}
        <p className="font-inter font-light animate-fade-up-delay2 text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
          ReactJobs connects talented developers with top-tier companies building the future of the web. 
          Stop scrolling generic job boards — every listing here is curated for React, 
          Next.js, and frontend engineers.
        </p>

        <p className="font-inter font-light animate-fade-up-delay2 text-slate-400 text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Whether you're a senior architect or just shipped your first side project, 
          there's a role waiting for you. Full-time, freelance, remote, hybrid — we've got it all.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-up-delay3 flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            to="/login"
            className="bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] shadow-[0_8px_32px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.6)] hover:from-[#3b82f6] hover:to-[#2563eb] transition-all duration-300 text-white px-8 py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2"
          >
            Browse Jobs <FaArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/register"
            className="border border-white/15 bg-white/5 backdrop-blur-lg hover:bg-white/10 hover:border-blue-400/40 hover:-translate-y-0.5 transition-all duration-300 text-white px-8 py-4 rounded-xl font-semibold text-base flex items-center justify-center"
          >
            Create Free Account
          </Link>
        </div>

        {/* Stats Row */}
        <div className="animate-fade-up-delay4 flex flex-wrap justify-center gap-10 mb-20">
          {[
            { num: "10K+", label: "Active Jobs" },
            { num: "3K+", label: "Companies Hiring" },
            { num: "50K+", label: "Developers Placed" },
            { num: "98%", label: "Satisfaction Rate" },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <p className="font-syne font-extrabold text-3xl text-white">{num}</p>
              <p className="text-slate-400 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="bg-gradient-to-r from-transparent via-blue-500/50 to-transparent w-full max-w-3xl h-px mb-20"></div>

        {/* Feature Cards */}
        <div className="animate-fade-up-delay4 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl w-full mx-auto mb-34">
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
            <div key={title} className="bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 rounded-2xl p-6 text-left">
              <div className="mb-4 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                {icon}
              </div>
              <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Logo Slider - Infinite Scroll */}
        <div className="animate-fade-up-delay4 w-full max-w-6xl mx-auto mb-45 overflow-hidden">
          <p className="text-slate-300 text-sm text-center mb-8">Startups who used our platform</p>
          
          <div className="relative">
            {/* Scrolling container */}
            <div className="flex gap-8 md:gap-20 animate-scroll-mobile md:animate-scroll hover:[animation-play-state:paused]">
              {/* First set of logos */}
              <div className="flex gap-8 md:gap-20 items-center shrink-0">
                <div className="text-white/70 hover:text-white transition-colors text-2xl md:text-3xl font-bold whitespace-nowrap">🚲 Postmates</div>
                <div className="text-white/70 hover:text-white transition-colors text-2xl md:text-3xl font-bold whitespace-nowrap">⬛ PLAID</div>
                <div className="text-white/70 hover:text-white transition-colors text-2xl md:text-3xl font-bold whitespace-nowrap">📦 Airtable</div>
                <div className="text-white/70 hover:text-white transition-colors text-2xl md:text-3xl font-bold whitespace-nowrap">N nerdwallet</div>
                <div className="text-white/70 hover:text-white transition-colors text-2xl md:text-3xl font-bold whitespace-nowrap">🌿 acorns</div>
                <div className="text-white/70 hover:text-white transition-colors text-2xl md:text-3xl font-bold whitespace-nowrap">💼 Gusto</div>
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex gap-8 md:gap-20 items-center shrink-0">
                <div className="text-white/70 hover:text-white transition-colors text-2xl md:text-3xl font-bold whitespace-nowrap">🚲 Postmates</div>
                <div className="text-white/70 hover:text-white transition-colors text-2xl md:text-3xl font-bold whitespace-nowrap">⬛ PLAID</div>
                <div className="text-white/70 hover:text-white transition-colors text-2xl md:text-3xl font-bold whitespace-nowrap">📦 Airtable</div>
                <div className="text-white/70 hover:text-white transition-colors text-2xl md:text-3xl font-bold whitespace-nowrap">N nerdwallet</div>
                <div className="text-white/70 hover:text-white transition-colors text-2xl md:text-3xl font-bold whitespace-nowrap">🌿 acorns</div>
                <div className="text-white/70 hover:text-white transition-colors text-2xl md:text-3xl font-bold whitespace-nowrap">💼 Gusto</div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial strip */}
        <div className="animate-fade-up-delay4 max-w-2xl mx-auto text-center mb-8">
          <p className="text-slate-300 text-base italic leading-relaxed">
            "I landed my dream remote job at a Series B startup within 2 weeks of signing up. 
            The quality of listings here is unmatched — every company I applied to actually responded."
          </p>
          <p className="text-blue-400 text-sm font-medium mt-3">— Priya S., Senior React Developer</p>
        </div>

      </section>

    </div>
  );
};

export default Home;