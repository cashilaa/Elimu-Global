import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Briefcase, FileText, Award, Globe, MessageCircle, 
  Star, ArrowRight, ArrowLeft, Mail, Lock, Eye, EyeOff 
} from 'lucide-react';

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
              <div className="relative group">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Years of teaching experience"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter subjects (comma-separated)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 text-center">
                Instructor Registration
              </h2>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Join our community of educators and start sharing your knowledge
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-center items-center space-x-2">
                {['Account', 'Qualifications', 'Profile', 'Social'].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-full 
                      ${formStep === index 
                        ? 'bg-blue-600 text-white' 
                        : formStep > index 
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }
                    `}>
                      {formStep > index ? '✓' : index + 1}
                    </div>
                    {index < 3 && (
                      <div className={`w-12 h-1 mx-2 ${
                        formStep > index ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {renderStepContent()}

              <div className="flex justify-between pt-4">
                {formStep > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </button>
                )}
                {formStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className={`${!formStep && 'w-full'} ml-auto inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorForm;
