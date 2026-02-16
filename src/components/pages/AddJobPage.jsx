import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft} from 'react-icons/fa'
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
        
        {/* Floating Background Elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-800/15 rounded-full blur-3xl animate-float animation-delay-400"></div>
        </div>

        {/* Back Button */}
        <section className="relative z-10">
          <div className="container mx-auto py-6 px-6">
            <Link to="/jobs" className="text-blue-400 hover:text-blue-300 flex items-center transition-colors duration-300">
              <FaArrowLeft className="mr-2" /> Back to Job Listings
            </Link>
          </div>
        </section>

        {/* Form Section */}
        <section className="relative z-10 pb-16">
          <div className="container mx-auto max-w-4xl px-6">
            <div className="modern-card hover-lift animate-fadeInUp">
              <form onSubmit={submitForm}>
                <h2 className="text-4xl text-center font-bold mb-8 text-white">Add Job</h2>
    
                {/* Grid Layout for Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Job Type */}
                  <div>
                    <label htmlFor="type" className="block text-white font-semibold mb-2">
                      Job Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      className="bg-white/10 border border-white/20 text-white rounded-lg w-full py-3 px-4 focus:outline-none focus:border-blue-500 transition-all duration-300"
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

                  {/* Contract Type */}
                  <div>
                    <label htmlFor="contractType" className="block text-white font-semibold mb-2">
                      Contract Type
                    </label>
                    <select
                      id="contractType"
                      name="contractType"
                      className="bg-white/10 border border-white/20 text-white rounded-lg w-full py-3 px-4 focus:outline-none focus:border-blue-500 transition-all duration-300"
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

                  {/* Category */}
                  <div className="md:col-span-2">
                    <label htmlFor="category" className="block text-white font-semibold mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="bg-white/10 border border-white/20 text-white rounded-lg w-full py-3 px-4 focus:outline-none focus:border-blue-500 transition-all duration-300"
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
    
                  {/* Job Title */}
                  <div className="md:col-span-2">
                    <label className="block text-white font-semibold mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg w-full py-3 px-4 focus:outline-none focus:border-blue-500 transition-all duration-300"
                      placeholder="eg. Senior React Developer"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-white font-semibold mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg w-full py-3 px-4 focus:outline-none focus:border-blue-500 transition-all duration-300"
                      rows="4"
                      placeholder="Add any job duties, expectations, requirements, etc"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
    
                  {/* Salary */}
                  <div>
                    <label htmlFor="salary" className="block text-white font-semibold mb-2">
                      Salary
                    </label>
                    <select
                      id="salary"
                      name="salary"
                      className="bg-white/10 border border-white/20 text-white rounded-lg w-full py-3 px-4 focus:outline-none focus:border-blue-500 transition-all duration-300"
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

                  {/* Location */}
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg w-full py-3 px-4 focus:outline-none focus:border-blue-500 transition-all duration-300"
                      placeholder="Company Location"
                      required           
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  {/* Application Link */}
                  <div className="md:col-span-2">
                    <label className="block text-white font-semibold mb-2">
                      Application Link <span className="text-gray-400 text-sm">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      id="applyLink"
                      name="applyLink"
                      className="bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg w-full py-3 px-4 focus:outline-none focus:border-blue-500 transition-all duration-300"
                      placeholder="https://company.com/apply or mailto:jobs@company.com"
                      value={applyLink}
                      onChange={(e) => setApplyLink(e.target.value)}
                    />
                  </div>
                </div>
    
                {/* Company Info Section */}
                <h3 className="text-2xl font-bold mt-10 mb-6 text-white border-t border-white/10 pt-8">Company Info</h3>
    
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Company Name */}
                  <div className="md:col-span-2">
                    <label htmlFor="company" className="block text-white font-semibold mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg w-full py-3 px-4 focus:outline-none focus:border-blue-500 transition-all duration-300"
                      placeholder="Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
    
                  {/* Company Description */}
                  <div className="md:col-span-2">
                    <label htmlFor="company_description" className="block text-white font-semibold mb-2">
                      Company Description
                    </label>
                    <textarea
                      id="company_description"
                      name="company_description"
                      className="bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg w-full py-3 px-4 focus:outline-none focus:border-blue-500 transition-all duration-300"
                      rows="4"
                      placeholder="What does your company do?"
                      value={companyDescription}
                      onChange={(e) => setCompanyDescription(e.target.value)}
                    ></textarea>
                  </div>
    
                  {/* Contact Email */}
                  <div>
                    <label htmlFor="contact_email" className="block text-white font-semibold mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      id="contact_email"
                      name="contact_email"
                      className="bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg w-full py-3 px-4 focus:outline-none focus:border-blue-500 transition-all duration-300"
                      placeholder="Email address for applicants"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>

                  {/* Contact Phone */}
                  <div>
                    <label htmlFor="contact_phone" className="block text-white font-semibold mb-2">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      id="contact_phone"
                      name="contact_phone"
                      className="bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg w-full py-3 px-4 focus:outline-none focus:border-blue-500 transition-all duration-300"
                      placeholder="Optional phone for applicants"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                  </div>
                </div>
    
                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    className="btn-modern bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg w-full focus:outline-none hover-lift shadow-2xl transition-all duration-300"
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