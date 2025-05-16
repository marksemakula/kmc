import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <FaPhone className="mr-2" /> +256 700 251 453
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-2" /> service@keyawell.or.ug
              </p>
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2" /> Uganda
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-accent">About Us</a></li>
              <li><a href="#" className="hover:text-accent">Services</a></li>
              <li><a href="#" className="hover:text-accent">Careers</a></li>
              <li><a href="#" className="hover:text-accent">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Emergency</h3>
            <p className="text-2xl font-bold text-accent">+256 784 628 883</p>
            <p className="mt-2">Available 24/7 for emergencies</p>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Keyawell Medical Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}