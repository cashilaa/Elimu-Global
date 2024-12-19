import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'react-feather';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/instructors/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.instructor));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ icon: Icon, ...props }) => (
    <div className="relative group">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
      <input
        {...props}
        className="w-full bg-white pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200 shadow-lg"
      />
    </div>
  );

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 to-purple-900 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl opacity-50"></div>

      {/* Content Wrapper */}
      <div className="relative w-4/5 max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* SVG & Testimonial Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-600 to-purple-500 text-white p-10 flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-24 h-24 mb-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          </svg>
          <div className="text-center space-y-4">
            <p className="text-lg italic">"This platform has transformed the way I learn! The interactive sessions are top-notch."</p>
            <span className="block font-bold">- Alex Johnson</span>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="max-w-sm mx-auto space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Welcome Back</h2>
              <p className="mt-2 text-gray-600">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 p-3 rounded-md">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <InputField
                icon={Mail}
                type="email"
                placeholder="Email address"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
              />

              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full bg-white pl-10 pr-10 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200 shadow-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 text-lg font-semibold text-white bg-blue-500 rounded-md shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span>Sign in</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
