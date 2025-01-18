import React from 'react';

export default function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <section>
            <h3 className="text-lg font-bold mb-4">Company Name</h3>
            <p className="text-gray-400">1234 Street Name, City, Country</p>
            <p className="text-gray-400">Email: info@company.com</p>
            <p className="text-gray-400">Phone: +123 456 789</p>
          </section>
          <section>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul>
              <li><a href="#" className="text-gray-400 hover:text-white" aria-label="Navigate to Home">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white" aria-label="Navigate to About Us">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white" aria-label="Navigate to Services">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white" aria-label="Navigate to Contact">Contact</a></li>
            </ul>
          </section>
          <section>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-400 hover:text-white" aria-label="Follow us on Facebook">Facebook</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white" aria-label="Follow us on Twitter">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white" aria-label="Follow us on Instagram">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white" aria-label="Follow us on LinkedIn">LinkedIn</a></li>
            </ul>
          </section>
        </div>

        <div className="text-center mt-8 text-gray-500">
          <p>&copy; 2024 Company Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
