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
<>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link to="/jobs" className="text-indigo-500 hover:text-indigo-600 flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

        <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div
            className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
          >
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>
  
              <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-bold mb-2"
                  >Job Type</label
                >
                <select
                  id="type"
                  name="type"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option> 
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="contractType" className="block text-gray-700 font-bold mb-2"
                  >Contract Type</label
                >
                <select
                  id="contractType"
                  name="contractType"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={contractType}
                  onChange={(e) => setContractType(e.target.value)}
                >
                  <option value="Permanent">Permanent</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 font-bold mb-2"
                  >Category</label
                >
                <select
                  id="category"
                  name="category"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Software Development">Software Development</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="DevOps">DevOps</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Product Management">Product Management</option>
                  <option value="Project Management">Project Management</option>
                  <option value="Quality Assurance">Quality Assurance</option>
                  <option value="Database Administration">Database Administration</option>
                  <option value="Network Engineering">Network Engineering</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="IT Support">IT Support</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Other">Other</option>
                </select>
              </div>
  
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2"
                  >Job Title
                  </label>

                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Senior React Developer"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                  >Description
                  </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="Add any job duties, expectations, requirements, etc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
  
              {/* ✅ Salary dropdown with Not Disclosed option */}
              <div className="mb-4">
                <label htmlFor="salary" className="block text-gray-700 font-bold mb-2"
                  >Salary
                  </label>
                <select
                  id="salary"
                  name="salary"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                >
                  <option value="Under $50K">Under $50K</option>
                  <option value="$50K - 60K">$50K - $60K</option>
                  <option value="$60K - 70K">$60K - $70K</option>
                  <option value="$70K - 80K">$70K - $80K</option>
                  <option value="$80K - 90K">$80K - $90K</option>
                  <option value="$90K - 100K">$90K - $100K</option>
                  <option value="$100K - 125K">$100K - $125K</option>
                  <option value="$125K - 150K">$125K - $150K</option>
                  <option value="$150K - 175K">$150K - $175K</option>
                  <option value="$175K - 200K">$175K - $200K</option>
                  <option value="Over $200K">Over $200K</option>
                  <option value="Not Disclosed">Not Disclosed</option>
                </select>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Location
                </label>
                <input
                  type='text'
                  id='location'
                  name='location'
                  className='border rounded w-full py-2 px-3 mb-2'
                  placeholder='Company Location'
                  required           
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Application Link (Optional)
                </label>
                <input
                  type='url'
                  id='applyLink'
                  name='applyLink'
                  className='border rounded w-full py-2 px-3 mb-2'
                  placeholder='https://company.com/apply or mailto:jobs@company.com'
                  value={applyLink}
                  onChange={(e) => setApplyLink(e.target.value)}
                />
              </div>
  
              <h3 className="text-2xl mb-5">Company Info</h3>
  
              <div className="mb-4">
                <label htmlFor="company" className="block text-gray-700 font-bold mb-2"
                  >Company Name</label
                >
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
  
              <div className="mb-4">
                <label
                  htmlFor="company_description"
                  className="block text-gray-700 font-bold mb-2"
                  >Company Description</label
                >
                <textarea
                  id="company_description"
                  name="company_description"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="What does your company do?"
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                ></textarea>
              </div>
  
              <div className="mb-4">
                <label
                  htmlFor="contact_email"
                  className="block text-gray-700 font-bold mb-2"
                  >Contact Email</label
                >
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Email address for applicants"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contact_phone"
                  className="block text-gray-700 font-bold mb-2"
                  >Contact Phone</label
                >
                <input
                  type="tel"
                  id="contact_phone"
                  name="contact_phone"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Optional phone for applicants"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </div>
  
              <div>
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddJobPage