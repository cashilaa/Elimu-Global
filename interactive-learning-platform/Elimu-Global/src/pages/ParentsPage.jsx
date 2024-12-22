import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Book, Clock, Shield, Award, Users } from 'lucide-react';

const Button = ({ children, onClick }) => (
  <button className="bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 py-2 px-4" onClick={onClick}>
    {children}
  </button>
);

const Card = ({ children }) => (
  <div className="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 p-6">
    {children}
  </div>
);

const Accordion = ({ children }) => (
  <div className="accordion">
    {children}
  </div>
);

const AccordionItem = ({ title, children }) => (
  <details className="mb-4">
    <summary className="cursor-pointer font-semibold text-lg">{title}</summary>
    <div className="accordion-content p-2">{children}</div>
  </details>
);

const ParallaxSection = ({ bgImage, height, children, className }) => (
  <div
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: height,
    }}
    className={`relative ${className}`}
  >
    <div className="absolute inset-0 bg-black opacity-50"></div>
    {children}
  </div>
);

const ParentsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <ParallaxSection bgImage="smiling.jpg" height="auto" className="relative">
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white py-20 px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Empowering Your Child's Education</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Discover how Elimu Global provides a safe, engaging, and personalized learning experience for your child.
          </p>
        </motion.header>
      </ParallaxSection>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Elimu Global for Your Child?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-center">
                    {feature.icon}
                    <span className="ml-2">{feature.title}</span>
                  </div>
                  <div>
                    <p>{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
              {steps.map((step, index) => (
                <motion.li
                  key={step.title}
                  className="mb-10 ml-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <span className="text-blue-800 dark:text-blue-300">{index + 1}</span>
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <Accordion>
            {faqs.map((faq, index) => (
              <AccordionItem key={`item-${index}`} title={faq.question}>
                {faq.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join thousands of parents who trust Elimu Global for their children's education.</p>
          <Button size="lg">
            Create a Parent Account
          </Button>
        </section>
      </main>

    
    </div>
  );
};

const features = [
  {
    icon: <Book className="w-6 h-6 text-blue-500" />,
    title: "Personalized Learning",
    description: "AI-powered curriculum adapts to your child's unique learning style and pace."
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-500" />,
    title: "Safe Environment",
    description: "Secure platform with parental controls and content moderation."
  },
  {
    icon: <Clock className="w-6 h-6 text-blue-500" />,
    title: "Flexible Schedule",
    description: "Learn anytime, anywhere with 24/7 access to courses and materials."
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-blue-500" />,
    title: "Progress Tracking",
    description: "Real-time updates and detailed reports on your child's academic progress."
  },
  {
    icon: <Award className="w-6 h-6 text-blue-500" />,
    title: "Certified Teachers",
    description: "Expert instructors with proven track records in online education."
  },
  {
    icon: <Users className="w-6 h-6 text-blue-500" />,
    title: "Interactive Community",
    description: "Engage with other learners through moderated forums and group projects."
  }
];

const steps = [
  {
    title: "Create a Parent Account",
    description: "Sign up and set up your parent dashboard to manage your child's learning journey."
  },
  {
    title: "Add Your Child's Profile",
    description: "Input your child's information and learning preferences to personalize their experience."
  },
  {
    title: "Choose Courses",
    description: "Browse our extensive catalog and select courses that align with your child's interests and goals."
  },
  {
    title: "Monitor Progress",
    description: "Track your child's achievements, view detailed reports, and receive regular updates."
  }
];

const faqs = [
  {
    question: "Is Elimu Global safe for my child?",
    answer: "Yes, we prioritize safety with robust security measures, content moderation, and parental controls to ensure a protected learning environment."
  },
  {
    question: "How much does it cost?",
    answer: "We offer flexible pricing plans to suit different needs. Visit our pricing page for detailed information on our subscription options."
  },
  {
    question: "Can I track my child's progress?",
    answer: "Our parent dashboard provides real-time updates, detailed progress reports, and insights into your child's learning journey."
  },
  {
    question: "What age groups does Elimu Global cater to?",
    answer: "Elimu Global offers courses and content for learners from elementary school through high school, with age-appropriate material for each group."
  },
  {
    question: "How does the AI personalization work?",
    answer: "Our AI system analyzes your child's learning patterns, strengths, and areas for improvement to tailor the curriculum and pace to their individual needs."
  }
];

export default ParentsPage;
