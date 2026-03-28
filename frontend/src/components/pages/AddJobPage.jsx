import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { FaTwitter, FaYoutube, FaFacebook, FaEye, FaEyeSlash, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext';

const AddJobPage = ({ addJobSubmit}) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Full-Time');
    const [contractType, setContractType] = useState('Permanent');
    const [category, setCategory] = useState('Software Development');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('Under $50K');
    const [location, setLocation] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [applyLink, setApplyLink] = useState('');
      const currentYear = new Date().getFullYear();

    
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const submitForm = (e) => {
      e.preventDefault();

      const newJob = {
        title,
        type,
        contractType,
        category,
        location,
        description,
        salary,
        applyLink,
        userEmail: user?.email,
        posted: new Date().toISOString(),
        company : {
          name: companyName,
          description: companyDescription,
          contactEmail,
          contactPhone
        }
      }

      addJobSubmit(newJob)
      toast.success('Job added successfully');
      return navigate('/jobs', { replace: true })
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
        
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-blue-800/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-900/10 rounded-full blur-3xl"></div>
        </div>

        {/* Back Button */}
        <div className="relative z-10 container mx-auto px-6 pt-8">
          <Link to='/jobs' className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm font-medium">
            <FaArrowLeft className="mr-2" /> Back to Jobs
          </Link>
        </div>

        {/* Form Section */}
        <section className="relative z-10 py-12 px-6">
          <div className="container mx-auto max-w-2xl">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
              <form onSubmit={submitForm}>
                <h2 className="text-3xl text-center font-bold mb-2 text-white tracking-tight">Post a Job</h2>
                <p className="text-center text-slate-300 mb-8">
                  Get posting, get visibility, get ready to hire 💼
                </p>
    
                {/* Grid Layout for Form Fields */}
                <div className="space-y-5">
                  
                  {/* Job Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                      placeholder="e.g. Senior React Developer"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  {/* Job Type & Contract Type */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-slate-300 mb-2">
                        Job Type
                      </label>
                      <select
                        id="type"
                        name="type"
                        className="w-full bg-white/10 border border-white/20 text-white rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                        required
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="Full-Time" className="bg-slate-900">Full-Time</option>
                        <option value="Part-Time" className="bg-slate-900">Part-Time</option>
                        <option value="Remote" className="bg-slate-900">Remote</option>
                        <option value="Contract" className="bg-slate-900">Contract</option>
                        <option value="Internship" className="bg-slate-900">Internship</option> 
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contractType" className="block text-sm font-medium text-slate-300 mb-2">
                        Contract Type
                      </label>
                      <select
                        id="contractType"
                        name="contractType"
                        className="w-full bg-white/10 border border-white/20 text-white rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                        required
                        value={contractType}
                        onChange={(e) => setContractType(e.target.value)}
                      >
                        <option value="Permanent" className="bg-slate-900">Permanent</option>
                        <option value="Temporary" className="bg-slate-900">Temporary</option>
                        <option value="Contract" className="bg-slate-900">Contract</option>
                        <option value="Freelance" className="bg-slate-900">Freelance</option>
                      </select>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="w-full bg-white/10 border border-white/20 text-white rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Software Development" className="bg-slate-900">Software Development</option>
                      <option value="Web Development" className="bg-slate-900">Web Development</option>
                      <option value="Mobile Development" className="bg-slate-900">Mobile Development</option>
                      <option value="Data Science" className="bg-slate-900">Data Science</option>
                      <option value="DevOps" className="bg-slate-900">DevOps</option>
                      <option value="UI/UX Design" className="bg-slate-900">UI/UX Design</option>
                      <option value="Product Management" className="bg-slate-900">Product Management</option>
                      <option value="Project Management" className="bg-slate-900">Project Management</option>
                      <option value="Quality Assurance" className="bg-slate-900">Quality Assurance</option>
                      <option value="Database Administration" className="bg-slate-900">Database Administration</option>
                      <option value="Network Engineering" className="bg-slate-900">Network Engineering</option>
                      <option value="Cybersecurity" className="bg-slate-900">Cybersecurity</option>
                      <option value="IT Support" className="bg-slate-900">IT Support</option>
                      <option value="Marketing" className="bg-slate-900">Marketing</option>
                      <option value="Sales" className="bg-slate-900">Sales</option>
                      <option value="Customer Service" className="bg-slate-900">Customer Service</option>
                      <option value="Other" className="bg-slate-900">Other</option>
                    </select>
                  </div>

                  {/* Job Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                      Job Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                      rows="5"
                      placeholder="Describe the role, responsibilities, and requirements..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
    
                  {/* Salary & Location */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="salary" className="block text-sm font-medium text-slate-300 mb-2">
                        Salary
                      </label>
                      <select
                        id="salary"
                        name="salary"
                        className="w-full bg-white/10 border border-white/20 text-white rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                        required
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                      >
                        <option value="Under $50K" className="bg-slate-900">Under $50K</option>
                        <option value="$50K - 60K" className="bg-slate-900">$50K - $60K</option>
                        <option value="$60K - 70K" className="bg-slate-900">$60K - $70K</option>
                        <option value="$70K - 80K" className="bg-slate-900">$70K - $80K</option>
                        <option value="$80K - 90K" className="bg-slate-900">$80K - $90K</option>
                        <option value="$90K - 100K" className="bg-slate-900">$90K - $100K</option>
                        <option value="$100K - 125K" className="bg-slate-900">$100K - $125K</option>
                        <option value="$125K - 150K" className="bg-slate-900">$125K - $150K</option>
                        <option value="$150K - 175K" className="bg-slate-900">$150K - $175K</option>
                        <option value="$175K - 200K" className="bg-slate-900">$175K - $200K</option>
                        <option value="Over $200K" className="bg-slate-900">Over $200K</option>
                        <option value="Not Disclosed" className="bg-slate-900">Not Disclosed</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                        placeholder="e.g. New York, NY"
                        required           
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Application Link */}
                  <div>
                    <label htmlFor="applyLink" className="block text-sm font-medium text-slate-300 mb-2">
                      Application Link <span className="text-slate-400 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      id="applyLink"
                      name="applyLink"
                      className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                      placeholder="https://company.com/apply or mailto:jobs@company.com"
                      value={applyLink}
                      onChange={(e) => setApplyLink(e.target.value)}
                    />
                  </div>
                </div>
    
                {/* Company Info Section */}
                <h3 className="text-xl font-bold mt-8 mb-5 text-white border-t border-white/10 pt-6">Company Info</h3>
    
                <div className="space-y-5">
                  
                  {/* Company Name */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                      placeholder="Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
    
                  {/* Company Description */}
                  <div>
                    <label htmlFor="company_description" className="block text-sm font-medium text-slate-300 mb-2">
                      Company Description
                    </label>
                    <textarea
                      id="company_description"
                      name="company_description"
                      className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                      rows="4"
                      placeholder="What does your company do?"
                      value={companyDescription}
                      onChange={(e) => setCompanyDescription(e.target.value)}
                    ></textarea>
                  </div>
    
                  {/* Contact Email & Phone */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact_email" className="block text-sm font-medium text-slate-300 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        id="contact_email"
                        name="contact_email"
                        className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                        placeholder="jobs@company.com"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact_phone" className="block text-sm font-medium text-slate-300 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        id="contact_phone"
                        name="contact_phone"
                        className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                        placeholder="(555) 123-4567"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
    
                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3.5 rounded-lg font-semibold text-base shadow-lg cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 flex items-center justify-center gap-2"
                    type="submit"
                  >
                    Add Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
            
      </div>
      


    )
}

export default AddJobPage