import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeaturesSection from './components/FeaturesSection';
import NavBar from './components/NavBar';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import TypingEffect from './components/TypeEffect';
import PropTypes from 'prop-types';
import PricingPlan from './components/PricingPlan';
import Tooltip from './components/Tooltip';


const stats = {
  users: 1000,
  courses: 50,
  reviews: 500,
  instructors: 20,
  hours: 1000,
  students: 1000
}
// Reviews data remains unchanged
const reviews = [
  { name: "Dr. Jane Doe", title: "Professor of Computer Science", comment: "I've been using Elimu Global for years and I can confidently say it's the best platform for learning new skills out there.", rating: 5 },
  { name: "Mr. John Smith", title: "Software Engineer", comment: "I've taken several courses on Elimu Global and I've never been disappointed. The instructors are knowledgeable and the resources are top-notch.", rating: 5 },
  { name: "Ms. Maria Rodriguez", title: "Data Scientist", comment: "Elimu Global has helped me advance my career by providing in-depth courses on data science topics.", rating: 4 },
  { name: "Ms. Emily Clark", title: "High School Student", comment: "Elimu Global has been a great resource for supplementing my high school studies. The interactive lessons make learning fun!", rating: 5 },
  { name: "Mr. Alex Johnson", title: "University Student", comment: "The courses offered by Elimu Global have been very beneficial for my university studies. The flexibility allows me to learn at my own pace.", rating: 4 },
  { name: "Mr. Chris Lee", title: "Self-Taught Developer", comment: "Thanks to Elimu Global, I was able to learn programming from scratch and land a job in tech. Highly recommend for anyone looking to self-learn.", rating: 5 },
  { name: "Dr. Sarah Brown", title: "Lecturer", comment: "I recommend Elimu Global to my students for its comprehensive and well-structured courses that complement the university curriculum.", rating: 4 }
];

const FadeInSection = ({ children, delay = "0" }) => {
  FadeInSection.propTypes = {
    children: PropTypes.node.isRequired,
    delay: PropTypes.string
  };
  return (
    <div
      className="opacity-0 translate-y-10 animate-fade-in-up"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards"
      }}
    >
      {children}
    </div>
  );
};

const ReviewSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center py-16"
      aria-label="User Reviews Section"
    >
      <h2 className="text-5xl text-slate-800 font-bold mb-8" aria-label="What Our Users Say">
        What Our Users Say
      </h2>

      <div
        className="relative w-full h-64 overflow-hidden"
        aria-live="polite"
        aria-label="User reviews carousel"
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 transform ${
              index === currentIndex
                ? "translate-x-0 opacity-100"
                : index < currentIndex
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
            }`}
            aria-hidden={index !== currentIndex}
          >
            <Card
              className="bg-white text-blue-700 p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
              aria-label={`Review by ${review.name}`}
            >
              <CardHeader>
                <CardTitle aria-label={review.name}>{review.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-gray-600 italic"
                  aria-label={`Comment: ${review.comment}`}
                >
                  {review.comment.length > 100
                    ? `${review.comment.substring(0, 100)}...`
                    : review.comment}
                </p>
                {review.comment.length > 100 && (
                  <button
                    className="text-blue-600 hover:underline mt-2"
                    aria-label="Read More"
                  >
                    Read More
                  </button>
                )}
                <div
                  className="flex mt-3 space-x-1"
                  aria-label={`Rating: ${review.rating} out of 5 stars`}
                >
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${
                        i < review.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                      aria-hidden="true"
                    >
                      ★
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatsSection = ({ stats }) => {
  StatsSection.propTypes = {
    stats: PropTypes.shape({
      rating: PropTypes.number,
      students: PropTypes.number,
      instructors: PropTypes.number,
      freemiumCourses: PropTypes.number,
    }).isRequired,
  };

  return (
    <FadeInSection delay="200">
      <div
        className="flex flex-wrap justify-center gap-8 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-8"
        aria-label="Statistics Section"
      >
        {[
          {
            icon: "★",
            color: "yellow-500",
            value: stats?.rating || "4.8",
            label: "Avg. Course Rating",
          },
          {
            icon: "👥",
            color: "blue-500",
            value: stats?.students?.toLocaleString() || "10M+",
            label: "Registered Students",
          },
          {
            icon: "👨‍🏫",
            color: "green-500",
            value: stats.instructors?.toLocaleString() || "500+",
            label: "Expert Instructors",
          },
          {
            icon: "🎓",
            color: "purple-500",
            value: stats.freemiumCourses || "50+",
            label: "Free Courses",
          },
        ].map((stat, index) => (
          <FadeInSection delay={(index * 150).toString()} key={index}>
            <div
              className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-40 sm:w-48 md:w-56 transition-transform duration-300 transform hover:scale-105"
              aria-label={`${stat.label}: ${stat.value}`}
            >
              <div
                className={`text-5xl text-${stat.color} mb-4`}
                aria-hidden="true"
              >
                {stat.icon}
              </div>
              <div
                className="text-4xl font-bold text-gray-900 mb-2"
                aria-label={`Value: ${stat.value}`}
              >
                {stat.value}
              </div>
              <div
                className="text-gray-600 text-center text-base"
                aria-label={`Label: ${stat.label}`}
              >
                {stat.label}
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </FadeInSection>
  );
};

const LandingPage = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, studentsResponse, instructorsResponse] = await Promise.all([
          fetch("http://localhost:3000/api/courses"),
          fetch("http://localhost:3000/api/students"),
          fetch("http://localhost:3000/api/instructors"),
        ]);

        if (!coursesResponse.ok || !studentsResponse.ok || !instructorsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const coursesData = await coursesResponse.json();
        const studentsData = await studentsResponse.json();
        const instructorsData = await instructorsResponse.json();

        setCourses(coursesData.courses);
        setStudents(studentsData.students);
        setInstructors(instructorsData.instructors);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className="min-h-screen w-full bg-white overflow-hidden"
      aria-label="Landing Page"
    >
     

      {/* Hero Section */}
      <section
        className="pt-32 pb-24 px-6 sm:px-8 text-5xl sm:text-6xl xl:text-7xl lg:px-10 bg-gray-50"
        aria-label="Hero Section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeInSection delay="200">
              <div className="space-y-10">
                <h1
                  className="text-5xl sm:text-6xl xl:text-7xl font-bold leading-tight text-gray-900 animate-fade-in tracking-tight"
                  aria-label="Transform Your Future with World-Class Online Education"
                >
                  Transform Your Future with World-Class Online Education
                </h1>
                <TypingEffect aria-label="Dynamic Typing Effect" />

                {/* Enhanced Stats Section */}
                <StatsSection stats={stats} />

                {/* Call to Action */}
                <div
                  className="flex flex-col sm:flex-row gap-4 mt-10"
                  aria-label="Call to Action Buttons"
                >
                  
                  <Link
                    to="/free-courses"
                    className="px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105 flex items-center justify-center"
                    aria-label="Explore MIT Free Courses"
                  >
                    <Tooltip text='Explore a wide range of courses'>
                    <span>Explore MIT Free Courses</span>
                    </Tooltip>
                  </Link>
                  <Link
                    to="/signup"
                    className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-50 transition-transform duration-300 transform hover:scale-105 flex items-center justify-center"
                    aria-label="Sign Up Now"
                  >
                    <span>Sign Up Now</span>
                  </Link>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay="300">
              <div
                className="relative"
                aria-label="Illustration of Learning"
              >
                <div
                  className="absolute inset-0 bg-blue-500 rounded-2xl transform rotate-3 opacity-20"
                  aria-hidden="true"
                ></div>
                <img
                  src="./images2.jpg"
                  alt="Illustration of learning and education"
                  className="relative rounded-2xl shadow-2xl w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section aria-label="Features Section">
        <FeaturesSection />
      </section>

      {/* Enhanced Programs Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection delay="200">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-5xl font-bold text-gray-900">Industry-Leading Programs</h2>
                <p className="text-2xl text-gray-600 mt-4">Comprehensive learning tracks designed by industry experts</p>
              </div>
              <Link to="/programs" className="text-xl text-blue-600 hover:text-blue-700 transition-colors duration-300 font-medium">
                View All Programs →
              </Link>
            </div>
          </FadeInSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'UI/UX Design',
                subtitle: 'Master user-centered design',
                icon: '🎨',
                features: ['Figma Mastery', 'Design Systems', 'User Research'],
                duration: '6 months'
              },
              { 
                title: 'Language Learning',
                subtitle: 'Achieve fluency faster',
                icon: '🗣️',
                features: ['Native Tutors', 'Live Sessions', 'Cultural Immersion'],
                duration: '3-12 months'
              },
              { 
                title: 'Digital Marketing',
                subtitle: 'Drive growth & engagement',
                icon: '📱',
                features: ['SEO/SEM', 'Social Media', 'Analytics'],
                duration: '4 months'
              },
              { 
                title: 'Chemistry',
                subtitle: 'Unleash your inner scientist',
                icon: '💻',
                features: ['Chemical Equations', 'Atomic Structure', 'Molecular Theory'],
                duration: '8 months'
              }
            ].map((program, index) => (
              <FadeInSection delay={(index * 200).toString()} key={index}>
                <div className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  <div className="text-4xl mb-4">{program.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-lg text-gray-600 mb-4">{program.subtitle}</p>
                  <ul className="text-base text-gray-500 space-y-2">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <span className="mr-2">•</span>{feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-base font-medium text-blue-600">
                      Duration: {program.duration}
                    </span>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <ReviewSection />
      <div className="h-16"></div>
      <PricingPlan />

      <div className="h-48"></div>



      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
            to {
            opacity: 1;
            }
      }
            `}</style>
            </div>
  )
};
export default LandingPage;
         