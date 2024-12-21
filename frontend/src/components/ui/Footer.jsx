import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div>
      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Popular Courses Section */}
            <div>
              <h4 className="text-xl font-bold mb-6">Popular Courses</h4>
              <ul className="space-y-4">
                {['Algebra', 'Biology', 'Chemistry', 'Mathematics', 'See more'].map((item, index) => (
                  <li key={index}>
                    <Link to="#" className="text-lg text-blue-100 hover:text-white transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Section */}
            <div>
              <h4 className="text-xl font-bold mb-6">More</h4>
              <ul className="space-y-4">
                {['Help', 'Contact', 'About Us', 'Accessibility'].map((item, index) => (
                  <li key={index}>
                    <Link to="#" className="text-lg text-blue-100 hover:text-white transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Section */}
            <div>
              <h4 className="text-xl font-bold mb-6">Social</h4>
              <ul className="space-y-4">
                {['LinkedIn', 'Facebook', 'Twitter', 'Instagram'].map((item, index) => (
                  <li key={index}>
                    <Link to="#" className="text-lg text-blue-100 hover:text-white transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h4 className="text-xl font-bold mb-6">Legal</h4>
              <ul className="space-y-4">
                {['Terms & Services', 'Privacy Policy', 'Licenses'].map((item, index) => (
                  <li key={index}>
                    <Link to="#" className="text-lg text-blue-100 hover:text-white transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Logo and Copyright */}
          <div className="mt-12 space-y-4">
            <img src="./logo1.jpeg" alt="Global Elimu" className="h-10 w-auto" />
            <p className="text-sm text-blue-100"> 2024 Elimu Global. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    );
}