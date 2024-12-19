import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Briefcase, FileText, Award, Globe, MessageCircle, 
  Star, ArrowRight, ArrowLeft, Mail, Lock, Eye, EyeOff 
} from 'lucide-react';
import Testimonial from './ui/Testimonial';
import BlobButton from './ui/BlobButton';

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phoneNumber: '',
  expertise: '',
  experience: '',
  education: '',
  certification: '',
  teachingAreas: [],
  bio: '',
  socialLinks: {
    linkedin: '',
    twitter: '',
    website: ''
  },
  profilePicture: null
};

const InstructorForm = () => {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [previewUrl, setPreviewUrl] = useState(null);

  const inputClasses = `
    mt-1 block w-full px-4 py-3 
    bg-white border-b border-gray-200
    focus:ring-0 focus:border-blue-500
    transition-all duration-200
    hover:border-b-blue-300
    ${showPassword ? 'pr-12' : 'pr-4'}
  `;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        setFormData(prev => ({
          ...prev,
          profilePicture: file
        }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
      return;
    }

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
      return;
    }

    if (name === 'teachingAreas') {
      const areas = value.split(',').map(area => area.trim()).filter(area => area !== '');
      setFormData(prev => ({
        ...prev,
        [name]: areas
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getInitials = () => {
    return formData.firstName.charAt(0).toUpperCase() || '?';
  };

  const validateStep = () => {
    switch (formStep) {
      case 0:
        return formData.firstName && 
               formData.lastName && 
               formData.email && 
               formData.password;
      case 1:
        return formData.expertise && 
               formData.experience && 
               formData.education;
      case 2:
        return formData.teachingAreas.length > 0 && 
               formData.bio;
      case 3:
        return true; // Social links are optional
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setFormStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setFormStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (key === 'profilePicture') {
          if (formData[key]) {
            formDataToSend.append('profilePicture', formData[key]);
          }
        } else if (key === 'socialLinks' || key === 'teachingAreas') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch(`http://localhost:3000/api/instructors/register`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Registration successful! Please log in to continue.');
        setFormData(INITIAL_FORM_STATE);
        setFormStep(0);
        setPreviewUrl(null);
        navigate('/login');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(error.message || 'An error occurred during registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (formStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-4 mb-6">
              <div className="relative group cursor-pointer transform transition-all duration-200 hover:scale-105">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold">
                    {getInitials()}
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer group-hover:bg-gray-50">
                  <input
                    type="file"
                    name="profilePicture"
                    onChange={handleChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <User className="h-5 w-5 text-gray-600" />
                </label>
              </div>
              <p className="text-sm text-gray-500">
                {previewUrl ? 'Click icon to change picture' : 'Click icon to add picture'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expertise</label>
              <input
                type="text"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Your main area of expertise"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Years of teaching experience"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleChange}
                className={inputClasses}
                rows="3"
                placeholder="Your educational background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
              <textarea
                name="certification"
                value={formData.certification}
                onChange={handleChange}
                className={inputClasses}
                rows="3"
                placeholder="Relevant certifications"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teaching Areas</label>
              <input
                type="text"
                name="teachingAreas"
                value={formData.teachingAreas.join(', ')}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Enter subjects (comma-separated)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className={inputClasses}
                rows="4"
                placeholder="Tell us about yourself"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
              <input
                type="url"
                name="socialLinks.linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleChange}
                className={inputClasses}
                placeholder="LinkedIn URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Profile</label>
              <input
                type="url"
                name="socialLinks.twitter"
                value={formData.socialLinks.twitter}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Twitter URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Personal Website</label>
              <input
                type="url"
                name="socialLinks.website"
                value={formData.socialLinks.website}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Website URL"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Form Section */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100" />
        <div className="relative h-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg">
              <div className="px-4 py-6 sm:px-8 sm:py-8">
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center">
                    Instructor Registration
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 text-center">
                    Join our community of educators and start sharing your knowledge
                  </p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8 sm:mb-10 overflow-x-auto">
                  <div className="flex justify-center items-center min-w-max px-4">
                    {['Account', 'Qualifications', 'Profile', 'Social'].map((step, index) => (
                      <div key={step} className="flex items-center">
                        <div className={`
                          flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full 
                          transition-all duration-300 ease-in-out
                          ${formStep === index 
                            ? 'bg-blue-600 text-white ring-4 ring-blue-100' 
                            : formStep > index 
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-400'
                          }
                        `}>
                          {formStep > index ? '✓' : index + 1}
                        </div>
                        {index < 3 && (
                          <div className={`w-8 sm:w-16 h-1 mx-1 sm:mx-2 rounded-full transition-all duration-300 ${
                            formStep > index ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-2 space-x-4 sm:space-x-16 min-w-max px-4">
                    {['Account', 'Qualifications', 'Profile', 'Social'].map((step, index) => (
                      <span key={step} className={`text-xs font-medium ${
                        formStep >= index ? 'text-blue-600' : 'text-gray-400'
                      }`}>
                        {step}
                      </span>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-white/50 backdrop-blur p-4 sm:p-6">
                    {renderStepContent()}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex flex-col sm:flex-row justify-between pt-6 gap-4">
                    {formStep > 0 && (
                      <BlobButton
                        type="button"
                        onClick={prevStep}
                        variant="secondary"
                        className="sm:w-1/3"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous
                      </BlobButton>
                    )}
                    {formStep < 3 ? (
                      <BlobButton
                        type="button"
                        onClick={nextStep}
                        className={formStep === 0 ? 'w-full' : 'sm:w-2/3'}
                      >
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </BlobButton>
                    ) : (
                      <BlobButton
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          'Complete Registration'
                        )}
                      </BlobButton>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image & Testimonials Section */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-cover bg-center" 
             style={{ backgroundImage: "url('/images/teacher-background.jpg')" }} />
        <Testimonial />
      </div>
    </div>
  );
};

export default InstructorForm;
