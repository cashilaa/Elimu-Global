import React, { useEffect, useState, useRef } from "react";
import { RocketIcon, GraduationCapIcon, Users2Icon, ChevronRightIcon, BookOpenIcon, BrainIcon, BadgeCheckIcon, PlayIcon, SparklesIcon, MousePointerIcon, ChevronDownIcon, CheckCircleIcon, StarIcon, TrendingUpIcon, AwardIcon, FlagIcon, ArrowUpIcon } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

// Enhanced Intersection Observer Hook with threshold array
const useInView = (options = {}) => {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: [0.1, 0.5, 1], ...options });

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, inView];
};

// Section Component
const Section = ({ children, className = "", onVisible, index }) => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  
  useEffect(() => {
    if (inView) {
      onVisible(index);
    }
  }, [inView, onVisible, index]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className={`min-h-screen relative flex items-center justify-center py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
};

// Enhanced Mouse Trail Effect Component
const MouseTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    setTrail((prev) => [...prev, mousePosition].slice(-20));
  }, [mousePosition]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {trail.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-blue-500 blur-sm"
          style={{
            left: pos.x,
            top: pos.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1 - i / trail.length, scale: 1 - i / trail.length }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  );
};

// Enhanced Background Manager with Parallax
const BackgroundManager = ({ currentSection }) => {
  const backgrounds = [
    'edu.jpg',
    'laptop.jpg',
    'reading.jpg',
    'school.jpg',
  ];

  return (
    <div className="fixed inset-0 z-0">
      {backgrounds.map((bg, index) => (
        <motion.div
          key={index}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{
            scale: currentSection === index ? 1 : 1.1,
            opacity: currentSection === index ? 1 : 0,
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-sm" />
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced Modern Button Component
const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyles = "group px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-2 relative overflow-hidden";
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30",
    outline: "border-2 border-white/30 text-white hover:border-white/50 backdrop-blur-md",
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
};

// Enhanced Feature Card Component
const FeatureCard = ({ icon, title, description, index }) => {
  const [ref, inView] = useInView({ threshold: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative bg-gradient-to-br from-blue-900/90 to-blue-800/90 backdrop-blur-md rounded-2xl p-8 border border-blue-700/50 hover:border-blue-500/50 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      <div className="relative flex flex-col items-center text-center space-y-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="p-4 rounded-full bg-blue-700/50 backdrop-blur-md"
        >
          {icon}
        </motion.div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-blue-100/90">{description}</p>
      </div>
    </motion.div>
  );
};

// Enhanced Stats Card Component
const StatsCard = ({ number, label, icon, index }) => {
  const [ref, inView] = useInView({ threshold: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-gradient-to-br from-blue-800/90 to-blue-700/90 backdrop-blur-md rounded-2xl p-6 border border-blue-600/50 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex flex-col items-center"
      >
        <motion.div 
          className="mb-4 text-blue-300 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
        >
          {icon}
        </motion.div>
        <motion.div 
          className="text-4xl font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {number}
        </motion.div>
        <motion.div 
          className="text-blue-100/90 font-medium"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {label}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Advertising Gig Component
const AdvertisingGig = ({ title, description, icon }) => (
  <motion.div
    className="bg-gradient-to-br from-blue-900/90 to-blue-800/90 backdrop-blur-md rounded-2xl p-6 border border-blue-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
    whileHover={{ scale: 1.05 }}
  >
    <div className="flex items-center mb-4">
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="mr-3 p-2 bg-blue-700/50 rounded-full"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className="text-blue-100/90">{description}</p>
  </motion.div>
);

// Enhanced Join Question Component
const JoinQuestion = () => {
  const [selected, setSelected] = useState(null);

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-900/90 to-blue-800/90 backdrop-blur-md rounded-2xl p-8 border border-blue-700/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Ready to start your journey?</h3>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        <motion.button
          className={`px-6 py-4 rounded-lg text-lg font-semibold transition-all duration-300 ${
            selected === 'student' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelected('student')}
        >
          Join as Student
        </motion.button>
        <motion.button
          className={`px-6 py-4 rounded-lg text-lg font-semibold transition-all duration-300 ${
            selected === 'instructor' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelected('instructor')}
        >
          Join as Instructor
        </motion.button>
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 text-center text-white"
          >
            <p className="mb-4">
              {selected === 'student'
                ? "Great choice! As a student, you'll have access to a world of knowledge."
                : "Excellent! As an instructor, you'll be able to share your expertise with eager learners."}
            </p>
            <Button variant="primary">
              Continue as {selected === 'student' ? 'Student' : 'Instructor'}
              <ChevronRightIcon className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Floating Action Button Component
const FloatingActionButton = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          className="bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUpIcon className="w-6 h-6" />
        </motion.button>
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />
    </>
  );
};

// Typing Effect Component
const TypingEffect = ({ text }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <span>
      {text.substring(0, currentIndex)}
      <span className="animate-cursor">|</span>
    </span>
  );
};


// Main Component (updated)
export default function LandingPage() {
  const [currentSection, setCurrentSection] = useState(0);

  const handleSectionChange = (index) => {
    setCurrentSection(index);
  };

  return (
    <div className="relative min-h-screen">
      <MouseTrail />
      <BackgroundManager currentSection={currentSection} />
      <FloatingActionButton />
      
      {/* Hero Section */}
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <Section onVisible={handleSectionChange} index={0} className="z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="mb-8">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/90 to-blue-800/90 backdrop-blur-md text-sm font-medium text-blue-100 border border-blue-700/50"
              >
                <SparklesIcon className="w-4 h-4 mr-2" />
                <TypingEffect text="Welcome to Elmu Global" />
              </motion.span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-md p-8 rounded-2xl border border-blue-700/50"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent">
                <TypingEffect text="Learn Without Boundaries" />
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100/90 max-w-3xl mx-auto">
                <TypingEffect text="Transform your future through interactive learning powered by cutting-edge AI technology" />
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col md:flex-row gap-4 justify-center"
              >
                <Button>
                  Start Your Journey <ChevronRightIcon className="w-5 h-5" />
                </Button>
                <Button variant="secondary">
                  Watch Demo <PlayIcon className="w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <div className="flex flex-col items-center justify-center h-screen">
            <motion.div
              className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white md:w-20 md:h-20"
              initial={{ y: 0 }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ChevronDownIcon className="w-6 h-6 md:w-12 md:h-12" />
            </motion.div>
            <p className="mt-2 text-blue-100">Scroll Down</p>
          </div>
        </Section>
      </div>

      {/* Stats Section */}
      <Section onVisible={handleSectionChange} index={1} className="z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} index={index} />
            ))}
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section onVisible={handleSectionChange} index={2} className="z-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-md p-8 rounded-2xl border border-blue-700/50"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent">
              Why Choose Elmu Global?
            </h2>
            <p className="text-xl text-blue-100/90">
              Experience education reimagined for the digital age
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </Section>

      {/* Advertising Gigs Section */}
      <Section onVisible={handleSectionChange} index={3} className="z-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-md p-8 rounded-2xl border border-blue-700/50"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent">
              Unlock Your Potential
            </h2>
            <p className="text-xl text-blue-100/90">
              Discover the opportunities that await you on Elmu Global
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advertisingGigs.map((gig, index) => (
              <AdvertisingGig key={index} {...gig} />
            ))}
          </div>
        </div>
      </Section>

      {/* Join Question Section */}
      <Section onVisible={handleSectionChange} index={4} className="z-10">
        <div className="max-w-4xl mx-auto px-4">
          <JoinQuestion />
        </div>
      </Section>

      {/* CTA Section */}
      <Section onVisible={handleSectionChange} index={5} className="z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto text-center px-4"
        >
          <div className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-md p-8 rounded-2xl border border-blue-700/50">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent">
              Begin Your Learning Journey Today
            </h2>
            <p className="text-xl mb-12 text-blue-100/90">
              Join our global community of learners and unlock your full potential.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button>
                Get Started <ChevronRightIcon className="w-5 h-5" />
              </Button>
              <Button variant="outline">
                Explore Courses <BookOpenIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}

const stats = [
  {
    number: "100K+",
    label: "Active Learners",
    icon: <Users2Icon className="w-8 h-8" />,
  },
  {
    number: "1000+",
    label: "Courses",
    icon: <BookOpenIcon className="w-8 h-8" />,
  },
  {
    number: "95%",
    label: "Success Rate",
    icon: <BadgeCheckIcon className="w-8 h-8" />,
  },
  {
    number: "24/7",
    label: "AI Support",
    icon: <BrainIcon className="w-8 h-8" />,
  },
];

const features = [
  {
    icon: <RocketIcon className="w-8 h-8 text-blue-300" />,
    title: "Personalized Learning",
    description: "AI-powered adaptive learning paths that adjust to your pace and style.",
  },
  {
    icon: <BrainIcon className="w-8 h-8 text-blue-300" />,
    title: "Global Community",
    description: "Connect with learners worldwide and engage in collaborative projects.",
  },
  {
    icon: <Users2Icon className="w-8 h-8 text-blue-300" />,
    title: "Expert Instruction",
    description: "Learn from industry leaders and certified professionals in your field.",
  },
  {
    icon: <BadgeCheckIcon className="w-8 h-8 text-blue-300" />,
    title: "Verified Certifications",
    description: "Earn industry-recognized certificates to showcase your expertise.",
  },
  {
    icon: <BookOpenIcon className="w-8 h-8 text-blue-300" />,
    title: "Rich Content Library",
    description: "Access thousands of courses, workshops, and learning resources.",
  },
  {
    icon: <GraduationCapIcon className="w-8 h-8 text-blue-300" />,
    title: "Career Support",
    description: "Get guidance from career coaches and connect with top employers.",
  }
];

const advertisingGigs = [
  {
    title: "Become a Top-Rated Instructor",
    description: "Share your expertise, build your brand, and earn while teaching thousands of students worldwide.",
    icon: <StarIcon className="w-8 h-8 text-yellow-400" />,
  },
  {
    title: "Learn In-Demand Skills",
    description: "Master the most sought-after skills in tech, business, and creative fields to boost your career.",
    icon: <TrendingUpIcon className="w-8 h-8 text-green-400" />,
  },
  {
    title: "Get Certified",
    description: "Earn industry-recognized certifications to validate your skills and stand out in the job market.",
    icon: <AwardIcon className="w-8 h-8 text-purple-400" />,
  },
  {
    title: "Join Learning Challenges",
    description: "Participate in exciting learning challenges and competitions to test your skills and win prizes.",
    icon: <FlagIcon className="w-8 h-8 text-red-400" />,
  },
];
